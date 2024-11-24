import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import ZippedUpload, { Base64Payload } from '../types/aws/LamdaPayload/ZippedUpload';
import zipFileHandler from "../src/ZipFileHandler"
import { LambdaDefaultConfig } from '../aws/config';
import SearchPackagesRequest from '../types/Request/SearchPackagesRequest';

const router = Router();
router.get(
    '/:nameRegex/:readmeRegex',
    async (req: SearchPackagesRequest, res: Response) => {
        /**
         * Passing in raw regex over the network will fail since it will mess with the URL.
         *  -urls dont allow you to use: [] () / _
         * Possiably hash the regex with SHA256 before sending it and unhash it before using it.
         */
        const endPointResponse = {
            params: req.params,
            body: req.body
        };

        res.status(200).send(endPointResponse);
    }
)

export default router;