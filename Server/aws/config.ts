
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

const config: AWSConfig = {
    UploadZippedLambda: "zippedUploads",
    LambdaFunctionDefaultRegion: "us-east-1"
}

interface AWSConfig {
    UploadZippedLambda: string,
    LambdaFunctionDefaultRegion: string,
}

export default config;