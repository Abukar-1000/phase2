/**
 * Please see the individual function documentation for information.
 * This module processes registry urls
 * @author DSinc
 */
import { PackageURL } from '../Types/URLTypes';
import { fetchPackageInfo } from '../Requests/Npm/registry';
import { transformToNDJSONRow } from '../Transform/NDJSON';
import { QueryParams, Repository } from '../Types/DataTypes';
import { getOwnerNameFromGithubUrl } from './githubProcessor';

/**
 * @author John Leidy
 * takes in an npm url and returns a github repository url if one was found in the registry for npm
 * @param packageName - This is the package name for an npm url {@type string}
 * @returns a github repository url found from the registry
 */
export const getRepoUrl = async (packageName: string): Promise<string | undefined> => {
    const packageInfo = await fetchPackageInfo(packageName);
    if (packageInfo?.repository?.url) {
        return packageInfo.repository.url;
    }
    return undefined;
};

/**
 * @author John Leidy
 * takes in an npm url, gets the repo from the registry, creates params, returns them if there was a repo url found, else undefined
 * @param packageName - as the name suggests this is the package name for an npm url {@type string}
 * @returns params | undefined {@type Promise<QueryParams>|undefined}
 */
const getOwnerRepoNameFromNPMUrl = async (packageName: string): Promise<QueryParams | undefined> => {
    const repoUrl = await getRepoUrl(packageName);
    if (repoUrl) {
        //get the owner and name
        const params = getOwnerNameFromGithubUrl(repoUrl);
        //can return params or undefined
        return params;
    } else {
        //repo url wasn't found
        return undefined;
    }
};

/**
 * @author John Leidy
 * @description This function processes an npm url. Specifically it uses the data provided from clean urls to reach out to the npm registry. Get a repo url that is stored there
 * Then use that information along with information from the data from cleanurls to build a repository.
 * @remarks if anything fails it returns undefined, which means it won't be pushed into the repo builder arr in the function that calls this function
 * @param npmUrlDataElement - as the name suggests it is an element of data that contains information from an npm url {@type PackageUrl}
 * @returns a repository or undefined {@type Repository<T>|undefined}
 */
export const processNpmUrl = async <T>(npmUrlDataElement: PackageURL): Promise<Repository<T> | undefined> => {
    if (npmUrlDataElement) {
        if (npmUrlDataElement.packageName) {
            const params = await getOwnerRepoNameFromNPMUrl(npmUrlDataElement.packageName);
            if (params) {
                return {
                    owner: params.owner,
                    repoName: params.repoName,
                    fileUrl: npmUrlDataElement.raw,
                    queryResult: null,
                    NDJSONRow: transformToNDJSONRow(npmUrlDataElement.raw),
                };
            } else {
                return undefined;
            }
        }
    }
    return undefined;
};
