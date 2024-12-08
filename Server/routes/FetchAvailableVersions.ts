import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';
import FetchAvailableVersionsRequest from '../types/Request/FetchAvailableVersionsRequest';

const router = Router();
router.get(
    '/:packageName/versions/:version/:versionRange',
    async (req: FetchAvailableVersionsRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };

        const payload = req.params;
        const client = new LambdaClient(LambdaDefaultConfig);
        const params: LamdaRequest = {
            FunctionName: config.FetchAvailableVersionLambda,
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

        res.status(200).send(response);
    }

)

export default router;