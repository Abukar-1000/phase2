import express, { Request, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';


const makeCall2 = async (req: any) => {
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

const makeCall = async (req: any) => {
    const payload = {
        nameRegex: req.RegEx,
    };
    const client = new LambdaClient(LambdaDefaultConfig);
    const params: LamdaRequest = {
        FunctionName: config.SearchPackageRequest,
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
    return response;
};

const router = Router();
router.get(
    '/regex',
    async (req: Request, res: Response) => {
        try {
            let output = await makeCall(req.body);
            res.status(200).send(
                {
                    status: 200,
                    body: output.body,
                }
            );
        } catch (err: any) {
            res.status(400).send(err.message);
        }
    }
);

export default router;