import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({
    region: "us-east-1",
});

export const handler = async (event: any): Promise<any> => {
    const { package: packageContent } = event;

    try {
        const parseRequestParams: any = {
            FunctionName: "parsePackage",
            InvocationType: "RequestResponse",
            Payload: JSON.stringify({
                package: packageContent,
            }),
        };

        const parseRequestCommand = new InvokeCommand(parseRequestParams);
        const result: any = await lambdaClient.send(parseRequestCommand);
        const pkgData: any = JSON.parse(
            Buffer.from(result.Payload?.buffer || "").toString("utf8")
        )?.body?.data;
        const rating: any = pkgData?.current_version?.rating;

        const isValid = (rating: any): boolean => Math.round(rating) >= 0.65;
        const isIngestable: boolean = isValid(rating?.net_score);

        if (isIngestable) {
            const uploadRequestParams: any = {
                FunctionName: "zippedUploads",
                InvocationType: "RequestResponse",
                Payload: JSON.stringify({
                    package: packageContent,
                }),
            };

            const uploadRequestCommand = new InvokeCommand(uploadRequestParams);
            const uploadResult: any = await lambdaClient.send(uploadRequestCommand);
            const response: any = JSON.parse(
                Buffer.from(uploadResult.Payload?.buffer || "").toString("utf8")
            )?.body;

            return {
                status: 200,
                body: {
                    isInjestable: isIngestable,
                    response: response,
                    rating: {
                        full: pkgData,
                        netScore: rating?.net_score,
                    },
                },
            };
        }

        return {
            status: 200,
            body: {
                isInjestable: isIngestable,
                rating: {
                    full: pkgData,
                    netScore: rating?.net_score,
                },
            },
        };
    } catch (err: any) {
        return {
            status: 400,
            message: "No zipped package file provided.",
            error: err.message,
        };
    }
};
