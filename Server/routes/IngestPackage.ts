import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';
import IngestPackageRequest from '../types/Request/IngestPackageRequest';
import ZippedUpload, {Base64Payload} from "../types/aws/LamdaPayload/ZippedUpload";

const router = Router();
router.post(
    '/:packageName/:version',
    async (req: IngestPackageRequest, res: Response) => {
        const base64ZippedFile: Base64Payload = req.file?.buffer.toString("base64");
        const payload: ZippedUpload = {
            packageName: req.params.packageName,
            version: req.params.version,
            package: base64ZippedFile
        }

        const client = new LambdaClient(LambdaDefaultConfig);
        let params: LamdaRequest = {
            FunctionName: config.IngestPackage,
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
    }
);

export default router;