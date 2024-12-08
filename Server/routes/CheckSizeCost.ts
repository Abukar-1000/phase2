import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';
import IngestPackageRequest from '../types/Request/IngestPackageRequest';
import CheckSizeCostRequest from '../types/Request/CheckSizeCostRequest';

const router = Router();
router.get(
    '/',
    async (req: CheckSizeCostRequest, res: Response) => {
        /**
         * 
         * Used the body of the request for the packages so there 
         * can be an array of simple Package objects.
         * 
         * Each has a name and an array of versions
         */
        const endPointResponse = {
            params: req.params,
            body: req.body
        };

        const client = new LambdaClient(LambdaDefaultConfig);
        const params: LamdaRequest = {
            FunctionName: config.CheckSizeCostRequest,
            InvocationType: "RequestResponse",
            Payload: JSON.stringify(req.body),
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

        res.status(200).send(response);
    }
)


export default router;