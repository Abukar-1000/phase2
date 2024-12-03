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

        res.status(200).send(endPointResponse);
    }
)


export default router;