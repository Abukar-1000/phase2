import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import ZippedUpload, { Base64Payload } from '../types/aws/LamdaPayload/ZippedUpload';
import UploadPackageRequest from '../types/Request/UploadPackageRequest';
import zipFileHandler from "../src/ZipFileHandler"
import { LambdaDefaultConfig } from '../aws/config';


const router = Router();
router.post(
    '/:debloat/:packageName/:version', 
    zipFileHandler.single('package'),
    async (req: UploadPackageRequest, res: Response) => {
        console.log(req.params, req.body);
        if (!req.file?.buffer) {
            res.status(500).send("Did not provide file!");
        }
        
        const base64ZippedFile: Base64Payload = req.file?.buffer.toString("base64");
        const payload: ZippedUpload = {
            packageName: req.params.packageName,
            version: req.params.version,
            package: base64ZippedFile
        }

        const client = new LambdaClient(LambdaDefaultConfig);
        const params: LamdaRequest = {
            FunctionName: config.UploadZippedLambda,
            InvocationType: "RequestResponse",
            Payload: JSON.stringify(payload),
        };
    
        let response: any = {};
        try {
            const command = new InvokeCommand(params);
            let result = await client.send(command);
            response = {
                status: 200,
                result: JSON.parse(
                    Buffer.from(result.Payload?.buffer as Buffer
                ).toString("utf8"))
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
});

export default router;