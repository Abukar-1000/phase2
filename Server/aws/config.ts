
/**
 * File is used for keeping all data related to 
 * AWS definitions in one place.
 * 
 * This is so if we want to change any data, we
 * only update their definitions in here.
 * 
 * Example:
 *  We decided to create a new lambda function to 
 *  handle a task. We only change its definition here.
 */


// @ts-ignore
const config: AWSConfig = {
    UploadZippedLambda: "zippedUploads",
    DownloadPackageLambda: "downloadPackage",
    UpdatePackageLambda: "updatePackage",
    IngestPackageLambda: "IngestPackage",
    FetchAvailableVersionLambda: "FetchAvailableVersion",
    FetchPackageDirectory:"FetchPackageDirectory",
    SearchPackageRequest:"SearchPackageRequest",
    ResetRequest:"ResetRequest",
    CheckSizeCostRequest:"CheckSizeCostRequest",
    LambdaFunctionDefaultRegion: "us-east-1",
    IngestPackage:"IngestPackage",
    RatePackage:"ratePackage",
}

const mode = process.env.Context === undefined? "dev": "prod";
const credentials = 
{
    accessKeyId: process.env.Id,
    secretAccessKey: process.env.Key
}

console.log(`Running in ${mode}`);

export const LambdaDefaultConfig = {
    region: config.LambdaFunctionDefaultRegion,
    credentials: credentials
}

interface AWSConfig {
    UploadZippedLambda: string,
    DownloadPackageLambda: string,
    UpdatePackageLambda: string,
    FetchAvailableVersionLambda: string,
    FetchPackageDirectory: string,
    SearchPackageRequest: string,
    ResetRequest: string,
    CheckSizeCostRequest: string,
    LambdaFunctionDefaultRegion: string,
    IngestPackage:string,
    RatePackage: string,
}

interface AWSConfig {
    UploadZippedLambda: string,
    DownloadPackageLambda: string,
    UpdatePackageLambda: string,
    FetchAvailableVersionLambda: string,
    FetchPackageDirectory: string,
    SearchPackageRequest: string,
    ResetRequest: string,
    CheckSizeCostRequest: string,
    LambdaFunctionDefaultRegion: string,
    IngestPackage:string,
    IngestPackageLambda: string,
}

export default config;