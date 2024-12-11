import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import supabase from "./config.ts";

const s3Client = new S3Client({ region: "us-east-1" });

const lambdaClient = new LambdaClient({
  region: "us-east-1",
});

export const handler = async (event: any): Promise<any> => {
  const { package: packageContent } = event;
  const bucketName = "npm-pkg-storage";

  try {
    const parseRequestParams: any = {
      FunctionName: "parsePackage",
      InvocationType: "RequestResponse",
      Payload: JSON.stringify({
        package: packageContent,
      }),
    };

    const parseRequestCommand = new InvokeCommand(parseRequestParams);
    const result: any = await lambdaClient.send(parseRequestCommand);
    const pkgData: any = JSON.parse(Buffer.from(result.Payload?.buffer || "").toString("utf8"))?.body?.data;
    const packageName: string = pkgData?.package_name;
    const version: string = pkgData?.current_version?.name;

    const { data: uploadCheckData, error: uploadCheckError }: any = await supabase
        .from("Package")
        .select("*")
        .eq("name", packageName);

    if (uploadCheckError) {
      throw new Error(`Database query error: ${uploadCheckError.message}`);
    }

    const packageExists: boolean = uploadCheckData.length > 0;
    if (packageExists) {
      const { data, error }: any = await supabase.rpc("updatepackage", {
        pkg: pkgData,
      });

      if (error) {
        return {
          statusCode: 500,
          body: {
            message: "Failed to update package in the database.",
            error: error.message,
            dbPayload: pkgData,
          },
        };
      }
    } else {
      const { data, error }: any = await supabase.rpc("uploadpackage", {
        pkg: pkgData,
      });

      if (error) {
        return {
          statusCode: 500,
          body: {
            message: "Failed to insert package into the database.",
            error: error.message,
            dbPayload: pkgData,
          },
        };
      }
    }

    const key: string = `${packageName}/${version}/${packageName}_${version}.zip`;
    const params: any = {
      Bucket: bucketName,
      Key: key,
      Body: Buffer.from(packageContent, "base64"),
      ContentType: "application/zip",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return {
      statusCode: 200,
      body: `${packageName} uploaded successfully`,
    };
  } catch (error: any) {
    console.error("Error uploading file to S3:", error);
    return {
      statusCode: 500,
      body: "Failed to upload zip file",
      error: error.message,
    };
  }
};

