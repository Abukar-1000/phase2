
// FetchAvailableVersionsRequest
import * as core from "express-serve-static-core";

export default interface IngestPackageRequest<
    P = {
        packageName: string,
        version: string,
    }, 
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>,
> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}
