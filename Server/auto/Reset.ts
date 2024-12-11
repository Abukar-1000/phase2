
import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import ZippedUpload, { Base64Payload } from '../types/aws/LamdaPayload/ZippedUpload';
import zipFileHandler from "../src/ZipFileHandler"
import { LambdaDefaultConfig } from '../aws/config';
import IngestPackageRequest from '../types/Request/IngestPackageRequest';
import CheckSizeCostRequest from '../types/Request/CheckSizeCostRequest';

const router = Router();
router.post(
    '/',
    async (req: Request, res: Response) => {
        
        res.status(200).send("Reset endpoint hit.");
    }
)

export default router;
