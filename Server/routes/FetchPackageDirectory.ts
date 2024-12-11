import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';
import FetchPackageDirectoryRequest from '../types/Request/FetchPackageDirectoryRequest';

const router = Router();
router.get(
    '/:page',
    async (req: FetchPackageDirectoryRequest, res: Response) => {
        /**
         * I removed limit from the request parameters.
         * Its a vulnurability if they are able to control the amt
         * of packages on a given response.
         *
         * Calcualte the given entries by page number and a fixed page
         * size only on the server
         */

        const pageSize = 30;
        const startIndex = (pageSize * req.params.page);
        const stopIndex = startIndex + pageSize;

        const endPointResponse = {
            params: {
                ...req.params,
                startIndex,
                stopIndex
            },
            body: req.body
        };
        const client = new LambdaClient(LambdaDefaultConfig);
        const params: LamdaRequest = {
            FunctionName: config.FetchPackageDirectory,
            InvocationType: "RequestResponse",
            Payload: JSON.stringify(endPointResponse.params),
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