import supabase from "./config.mjs";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const s3Client = new S3Client({ region: "us-east-1" });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const threeMin: number = 60 * 60 * 3;

    try {
        const body = event.body ? JSON.parse(event.body) : {};
        const { version, packageName }: { version: string; packageName: string } = body;

        if (!version || !packageName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Version and packageName are required." }),
            };
        }

        const key: string = `${packageName}/${version}/${packageName}_${version}.zip`;

        const { data: rows, error } = await supabase
            .from('Version')
            .select("*")
            .eq('location', key);

        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: `Unable to get ${packageName} version ${version}` }),
            };
        }

        const packageNotInDb = !rows || rows.length < 1;
        if (packageNotInDb) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `${packageName} version ${version} was not uploaded`,
                }),
            };
        }

        const s3GetCommand = new GetObjectCommand({
            Bucket: "npm-pkg-storage",
            Key: key,
        });

        const signedUrl = await getSignedUrl(s3Client, s3GetCommand, {
            expiresIn: threeMin,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                downloadLink: signedUrl,
                expiresIn: threeMin,
            }),
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || "Internal server error" }),
        };
    }
};
