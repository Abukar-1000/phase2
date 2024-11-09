
import * as core from "express-serve-static-core";

export default interface SearchPackagesRequest<
    P = {
        nameRegex: string | undefined,
        readmeRegex: string | undefined
    }, 
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>,
> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}

