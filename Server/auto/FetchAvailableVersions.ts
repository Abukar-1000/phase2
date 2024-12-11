import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';
import FetchAvailableVersionsRequest from '../types/Request/FetchAvailableVersionsRequest';


const makeCall = async (req: any) => {
    const payload = {
        packageName: req.Name.toLowerCase(),
        version: req.Version
    };
    console.log(payload);

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
        return JSON.parse(
            Buffer.from(result.Payload?.buffer as Buffer
            ).toString("utf8"));

    } catch (error) {
        response = {
            status: 500,
            result: error
        }
        console.error("Error invoking Lambda:", error);
    }

    return response;
}


const router = Router();
router.get(
    '/',
    async (req: FetchAvailableVersionsRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };

        const response: any = [];

        try {
            for (const pkg of req.body)
            {
                let versions = await makeCall(pkg)
                versions?.forEach((v: any) => {
                    response.push({
                        Name: pkg.Name,
                        Version: v,
                        ID: pkg.Name.toLowerCase()
                    })
                })
            }

            res.status(200).send(response);
        } 
        catch (err: any)
        {
            res.status(400).send(JSON.stringify(err.message) as string);
            //
        }
    }
)

export default router;