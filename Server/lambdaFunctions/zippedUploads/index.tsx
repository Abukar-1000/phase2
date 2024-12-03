import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({ region: "your-region" });

export const handler = async (event: any): Promise<any> => {
  const bucketName = "npm-pkg-storage";
  const key = "example.txt"; // File name
  const content = "This is the content of the file.";

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: content, // Content to upload
    ContentType: "text/plain", // MIME type
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(`File uploaded to ${bucketName}/${key}`);
    return {
      statusCode: 200,
      body: `File uploaded successfully to ${bucketName}/${key}`,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return {
      statusCode: 500,
      body: "Failed to upload file",
    };
  }
};
