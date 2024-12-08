
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

import secrets from "./secrets";

// @ts-ignore
const config: AWSConfig = {
    UploadZippedLambda: "zippedUploads",
    FetchAvailableVersionLambda: "FetchAvailableVersion",
    FetchPackageDirectory:"FetchPackageDirectory",
    SearchPackageRequest:"SearchPackageRequest",
    ResetRequest:"ResetRequest",
    CheckSizeCostRequest:"CheckSizeCostRequest",
    LambdaFunctionDefaultRegion: "us-east-1"
}

export const LambdaDefaultConfig = {
    region: config.LambdaFunctionDefaultRegion,
    credentials: secrets
}

interface AWSConfig {
    UploadZippedLambda: string,
    FetchAvailableVersionLambda: string,
    FetchPackageDirectory: string,
    SearchPackageRequest: string,
    ResetRequest: string,
    CheckSizeCostRequest: string,
    LambdaFunctionDefaultRegion: string,
}

export default config;