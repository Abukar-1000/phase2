import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import supabase from "./config.ts";

const s3Client = new S3Client({ region: "us-east-1" });

const lambdaClient = new LambdaClient({
    region: "us-east-1",
});

interface Event {
    package: string;
}

export const handler = async (event: Event): Promise<{ status: number; body?: string | object; error?: string }> => {
    const { package: packageContent } = event;
    const bucketName = "npm-pkg-storage";
    let packageName = "";
    let version = "";

    try {
        const parseRequestParams: any = {
            FunctionName: "parsePackage",
            InvocationType: "RequestResponse",
            Payload: JSON.stringify({
                package: packageContent,
            }),
        };

        const parseRequestCommand = new InvokeCommand(parseRequestParams);
        const result = await lambdaClient.send(parseRequestCommand);
        const pkgData = JSON.parse(Buffer.from(result.Payload as Uint8Array).toString("utf8"))?.body?.data;
        packageName = pkgData?.package_name;
        version = pkgData?.current_version?.name;

        const { data: uploadCheckData, error: uploadCheckError } = await supabase
            .from("Version")
            .select("*")
            .eq("name", version);

        if (uploadCheckError) throw new Error(uploadCheckError.message);

        if (uploadCheckData?.length > 0) {
            return {
                status: 200,
                body: `${packageName} version ${version} is already uploaded`,
            };
        }

        const { data, error } = await supabase.rpc("updatepackage", {
            pkg: pkgData,
        });

        if (error) {
            return {
                status: 500,
                body: {
                    message: "Failed to insert into database.",
                    error: error.message,
                    dbPayload: pkgData,
                },
            };
        }

        const key = `${packageName}/${version}/${packageName}_${version}.zip`;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: Buffer.from(packageContent, "base64"),
            ContentType: "application/zip",
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        return {
            status: 200,
            body: `${packageName} updated successfully`,
        };
    } catch (error: any) {
        return {
            status: 500,
            body: `Unable to update ${packageName} version ${version}, check zip file structure`,
            error: error.message,
        };
    }
};
