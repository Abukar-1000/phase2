import { Request, Response } from 'express';
import * as core from "express-serve-static-core";

interface exampleCustomType {
    arg1: string | number | null | undefined
}

export default interface CheckPackageRatingRequest<
    /**
     * Desired params and the posiable values they can take here
     * ex: 
            packageName: string | number | exampleCustomType,
        Same logic follows for the body, but we just need the zipped package which is always type blob
     */
    P = {
        packageName: string,
        version: string
    }, 
    ResBody = any,
    ReqBody = {
        package: Blob // This is the zipped file that will sent by the client. TS defined it as a blob 
    },
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>,
> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}

