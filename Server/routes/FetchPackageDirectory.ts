import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import ZippedUpload, { Base64Payload } from '../types/aws/LamdaPayload/ZippedUpload';
import zipFileHandler from "../src/ZipFileHandler"
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
            params: req.params,
            body: req.body
        };

        res.status(200).send(endPointResponse);
    }
)

export default router;