
export type Base64Payload = string  | undefined;

export default interface ZippedUpload {
    packageName: string,
    version: string,
    package: Uint8Array | Base64Payload
}