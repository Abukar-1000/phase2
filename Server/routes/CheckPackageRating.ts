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
import { requestFromGQL } from "../../MVP/src/Requests/GitHub/gql"
import * as processMethod from "../../MVP/src/Processors/gqlProcessor"
import * as processURLMethod from "../../MVP/src/Processors/urlProcessor"
import * as sanitize from "../../MVP/src/Input/Sanitize"
import { createLicenseField, createReadmeField, createTestMainQuery, createTestMasterQuery } from '../../MVP/src/Requests/QueryBuilders/fields';
import { repoQueryBuilder } from '../../MVP/src/Requests/QueryBuilders/repos';
import { BaseRepoQueryResponse, ReposFromQuery } from '../../MVP/src/Types/ResponseTypes';
import * as dotenv from "dotenv";

dotenv.config();
const router = Router();

router.post(
    '/:packageName/:version', 
    zipFileHandler.single('package'),
    async (req: CheckPackageRatingRequest, res: Response) => 
{
    try {

        console.log("req: \n", req.params, " \nbody:\n", req.body);
        if (!req.params.packageName) {
            res.status(400).send('No file uploaded.');
        }

        // const zipFilePath = req.file.path;

        const npmURL = `https://www.npmjs.com/package/${req.params.packageName}`
        const cleanSet = sanitize.SanitizeUrlSet([ npmURL ])
        const repo = await processURLMethod.buildReposFromUrls(cleanSet)

        const query = repoQueryBuilder(repo, [
            createLicenseField(),
            createReadmeField(),
            createTestMainQuery(),
            createTestMasterQuery(),
            'stargazerCount',
        ]);
        const result = await requestFromGQL<ReposFromQuery<BaseRepoQueryResponse>>(query);
        const cleanedRepos = processMethod.mapGQLResultToRepos(result, repo);
        
        const npmPkgScore = await scoreMethod.scoreRepositoriesArray(repo);
        
        res.status(200).send(npmPkgScore);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading or processing file');
    }
});

export default router;