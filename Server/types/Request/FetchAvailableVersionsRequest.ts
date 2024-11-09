
import * as core from "express-serve-static-core";

export default interface FetchAvailableVersionsRequest<
    P = {
        packageName: string,
        version: string | undefined,
        versionRange: string | undefined
    }, 
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>,
> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}

