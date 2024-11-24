import { Request, Response } from 'express';
import * as core from "express-serve-static-core";

export default interface UploadPackageRequest<
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

