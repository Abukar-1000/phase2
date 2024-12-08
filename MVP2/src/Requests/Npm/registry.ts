/**
 * Please see the individual function documentation for information.
 * This module handles the request to the registry for npm
 * @author DSinc
 */
import { NPMRegistryResponse } from '../../Types/ResponseTypes';
import { LogDebug } from '../../Utils/log';

/**
 * @author John Leidy
 * @description Takes in a package name, reaches out to the registry, returns the response if it was valid.
 * @param packageName npmjs.org package name extracted from url {@type string}
 * @returns a promise {@type Promise<NPMRegistryResponse>}
 */
export const fetchPackageInfo = async (packageName: string): Promise<NPMRegistryResponse | undefined> => {
    const registryUrl = `https://registry.npmjs.org/${packageName}`;

    try {
        const response = await fetch(registryUrl);
        const rawText = await response.text();
        const jsonResponse = JSON.parse(rawText);
        if (!response.ok) {
            return undefined;
        }
        return jsonResponse;
    } catch (error) {
        LogDebug(
            error instanceof Error
                ? `${error.message} when fetching package info for ${packageName}`
                : `an unknown error occured when hitting registry for ${packageName}`
        );
        return undefined;
    }
};
