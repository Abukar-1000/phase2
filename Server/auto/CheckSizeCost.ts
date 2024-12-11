import express, { Request, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';


const makeCall = async (req: any) => {
    const payload = {
        packageName: req.id,
    };
    console.log(payload);

    const client = new LambdaClient(LambdaDefaultConfig);
    const params: LamdaRequest = {
        FunctionName: config.CheckSizeCostRequest,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(payload),
    };
    let response: any = {};
    try {
        const command = new InvokeCommand(params);
        let result = await client.send(command);
        return JSON.parse(
            Buffer.from(result.Payload?.buffer as Buffer).toString("utf8")
        );
    } catch (error) {
        response = {
            status: 500,
            result: error
        };
        console.error("Error invoking Lambda:", error);
    }
    console.log(response);
    return response;
};

const router = Router();
router.get(
    '/:id/cost',
    async (req: Request, res: Response) => {
        try {
            let output = await makeCall(req.params);
            res.status(200).send(
                {
                    status: 200,
                    result: output,
                }
            );
        } catch (err: any) {
            res.status(400).send(err.message);
        }
    }
);

export default router;