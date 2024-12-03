import express, { Request, response, Response, Router } from 'express';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import config from '../aws/config';
import LamdaRequest from '../types/aws/LamdaRequest';
import ZippedUpload, { Base64Payload } from '../types/aws/LamdaPayload/ZippedUpload';
import UpdatePackageRequest from '../types/Request/UpdatePackageRequest';
import UploadPackageRequest from '../types/Request/UploadPackageRequest';
import zipFileHandler from "../src/ZipFileHandler"
import { LambdaDefaultConfig } from '../aws/config';
import CheckPackageRatingRequest from '../types/Request/CheckPackageRatingRequest';
import * as scoreMethod from "../../MVP/src/Scoring/scoring"
import * as processMethod from "../../MVP/src/Processors/urlProcessor"
import * as sanitize from "../../MVP/src/Input/Sanitize"
import DownloadPackageRequest from '../types/Request/DownloadPackageRequest';

const router = Router();

/**
 * was originally: /packages/{packageName}/{version} in plan
 * changed to:
 *  /packages/download/{packageName}/{version}
 */
router.get(
    '/:packageName/:version',
    async (req: DownloadPackageRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };
        res.status(200).send(endPointResponse);
    }
);

export default router;
