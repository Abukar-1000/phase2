import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import ZippedUpload, { Base64Payload } from '../types/aws/LamdaPayload/ZippedUpload';
import UpdatePackageRequest from '../types/Request/UpdatePackageRequest';
import UploadPackageRequest from '../types/Request/UploadPackageRequest';
import zipFileHandler from "../src/ZipFileHandler"
import { LambdaDefaultConfig } from '../aws/config';
import CheckPackageRatingRequest from '../types/Request/CheckPackageRatingRequest';
import * as scoreMethod from "../../MVP/src/Scoring/scoring"
import * as processMethod from "../../MVP/src/Processors/urlProcessor"
import * as sanitize from "../../MVP/src/Input/Sanitize"
import DownloadPackageRequest from '../types/Request/DownloadPackageRequest';

const router = Router();

/**
 * 
 */
router.get(
    '/:packageName/:version',
    async (req: DownloadPackageRequest, res: Response) => {
        
        const payload = {
            packageName: req.params?.packageName,
            version: req.params?.version
        };

        const client = new LambdaClient(LambdaDefaultConfig);
        const params: LamdaRequest = {
            FunctionName: config.DownloadPackageLambda,
            InvocationType: "RequestResponse",
            Payload: JSON.stringify(payload),
        };
    
        let response: any = {};
        try {
            const command = new InvokeCommand(params);
            let result = await client.send(command);
            response = {
                status: 200,
                result: JSON.parse( Buffer.from(result.Payload?.buffer as Buffer ).toString("utf8"))
            }
        } catch (error) {
            response = {
                status: 500,
                result: error
            }
            console.error("Error invoking Lambda:", error);
        }
        finally {
            const { status } = response;
            res.status(status).send(response);
        }

    }
);

export default router;
