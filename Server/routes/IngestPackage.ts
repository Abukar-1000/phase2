import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import ZippedUpload, { Base64Payload } from '../types/aws/LamdaPayload/ZippedUpload';
import zipFileHandler from "../src/ZipFileHandler"
import { LambdaDefaultConfig } from '../aws/config';
import IngestPackageRequest from '../types/Request/IngestPackageRequest';

const router = Router();
router.post(
    '/:packageName/:version',
    async (req: IngestPackageRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };
        res.status(200).send(endPointResponse);
    }
);

export default router;