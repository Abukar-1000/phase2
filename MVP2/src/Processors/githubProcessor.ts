/**
 * Please see the individual function documentation for information.
 * This module processes github urls.
 * @author DSinc
 */
import chalk from 'chalk';
import { transformToNDJSONRow } from '../Transform/NDJSON';
import { QueryParams, Repository } from '../Types/DataTypes';
import { RepoURL } from '../Types/URLTypes';
import { LogDebug } from '../Utils/log';

/**
 * @author John Leidy
 * @description takes in github url, returns QueryParams if the owner and name can be extracted using match
 * @remarks this is still necessary because there is not a universally exported function in cleanurls to handle this
 * we do not have the repo owner and repo name until we make a request to the registry to get the github url stored there
 * then we can reparse the url and extract those items
 * @param url any github url, including those that come back from registry with and without ssh
 * @returns a repo name and it's owner {@type QueryParams | undefined}
 */
export const getOwnerNameFromGithubUrl = (url: string): QueryParams | undefined => {
    //regex to pull the owner and repo name.
    //complex because npm urls can be ssh or http urls
    const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?$/;

    const match = url.match(regex);

    if (match) {
        const owner = match[1];
        const repoName = match[2];

        return { owner: owner, repoName: repoName };
    } else {
        LogDebug(`${url} was found to be an invalid github url post processing`);
        return undefined;
    }
};

/**
 * @author John Leidy
 * @description This function receives a RepoUrl obj and creates a repo using it
 * @param githubUrlData - The repo url data type from clean urls {@type RepoUrl}
 * @returns a repository with proper fielsd initialized
 */
export const processGitHubUrl = <T>(githubUrlData: RepoURL): Repository<T> | undefined => {
    if (githubUrlData) {
        return {
            owner: githubUrlData.repoOwner,
            repoName: githubUrlData.repoName,
            fileUrl: githubUrlData.raw,
            queryResult: null,
            NDJSONRow: transformToNDJSONRow(githubUrlData.raw),
        };
    } else {
        return undefined;
    }
};
