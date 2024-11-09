
import * as core from "express-serve-static-core";

export interface Package {
    name: string,
    versions: string[]
} 

export default interface CheckSizeCostRequest<
    P = core.ParamsDictionary, 
    ResBody = any,
    ReqBody = {
        packages: Package[]
    },
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>,
> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}

