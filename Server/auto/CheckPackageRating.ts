import express, { Request, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import { LambdaDefaultConfig } from '../aws/config';

const formatResponse = (body: any) => {
    if (!body) {
        // If body is null or undefined, return a default object with -1 values
        return {
            RampUp: -1,
            Correctness: -1,
            BusFactor: -1,
            ResponsiveMaintainer: -1,
            LicenseScore: -1,
            GoodPinningPractice: -1,
            PullRequest: -1,
            NetScore: -1,
            RampUpLatency: -1,
            CorrectnessLatency: -1,
            BusFactorLatency: -1,
            ResponsiveMaintainerLatency: -1,
            LicenseScoreLatency: -1,
            GoodPinningPracticeLatency: -1,
            PullRequestLatency: -1,
            NetScoreLatency: -1
        };
    }

    return {
        RampUp: body.ramp_up ?? -1,
        Correctness: body.correctness ?? -1,
        BusFactor: body.bus_factor ?? -1,
        ResponsiveMaintainer: body.responsive_maintainer ?? -1,
        LicenseScore: body.license ?? -1,
        GoodPinningPractice: body.create_package_json_field ?? -1,
        PullRequest: body.create_pull_requests_field ?? -1,
        NetScore: body.net_score ?? -1,
        RampUpLatency: body.ramp_up_latency ?? -1,
        CorrectnessLatency: body.correctness_latency ?? -1,
        BusFactorLatency: body.bus_factor_latency ?? -1,
        ResponsiveMaintainerLatency: body.responsive_maintainer_latency ?? -1,
        LicenseScoreLatency: body.license_latency ?? -1,
        GoodPinningPracticeLatency: body.create_package_json_field_latency ?? -1,
        PullRequestLatency: body.create_pull_requests_field_latency ?? -1,
        NetScoreLatency: body.net_score_latency ?? -1
    };
};

const makeCall = async (req: any) => {
    const payload = {
        packageName: req.id,
    };
    console.log(payload);

    const client = new LambdaClient(LambdaDefaultConfig);
    const params: LamdaRequest = {
        FunctionName: config.RatePackage,
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
    return response;
};

const router = Router();
router.get(
    '/:id/rate',
    async (req: Request, res: Response) => {
        try {
            let output = await makeCall(req.params);
            const formattedResponse = formatResponse(output.body);
            console.log(formattedResponse);
            res.status(200).send(
                {
                status: 200,
                result: output.body,
                }
            );
        } catch (err: any) {
            res.status(400).send(err.message);
        }
    }
);

export default router;