
export type RequestResponse = "RequestResponse";

export default interface LamdaRequest {
    FunctionName: string;
    /**
     *   ALL InvocationType MUST BE RequestResponse
     *   
     * - I decided to to only allow API to make calls that respond & not trigger events.
     * - This will avoid a situation where we might trigger an infinit recursion loop
     *   when using calling a lamda function. Allowing us to stay within the bounds of 
     *   free tier.
     */
    InvocationType: RequestResponse;
    LogType?: "None" | "Tail" | undefined;
    ClientContext?: string | undefined;
    Payload?: Uint8Array | string | undefined;
    Qualifier?: string | undefined;
}