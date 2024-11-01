/**
 * Please see the individual function documentation for information.
 * This module processes sanitized urls.
 * @author DSinc
 */
import { CleanURLSet } from '../Input/Sanitize';
import { Repository } from '../Types/DataTypes';
import { processGitHubUrl } from './githubProcessor';
import { processNpmUrl } from './registryProcessor';

/**
 * @author John Leidy
 * @description Takes in CleanUrlSet, returns generic repositories array
 * @param cleanUrls the query params and urls from files. {@type CleanUrlSet}
 * @returns repositories  {@type Repository<T>[]}
 */
export const buildReposFromUrls = async <T>(cleanUrls: CleanURLSet): Promise<Repository<T>[]> => {
    let repositories: Repository<T>[] = [];
    //Since the data is now split into separate types that do not have a consistent structure... process in two loops.
    for (const npmUrlDataElement of cleanUrls.npm_URLs) {
        const repo = await processNpmUrl<T>(npmUrlDataElement);
        if (repo) {
            repositories.push(repo);
        }
    }

    for (const gitUrlDataElement of cleanUrls.github_URLs) {
        const repo = await processGitHubUrl<T>(gitUrlDataElement);
        if (repo) {
            repositories.push(repo);
        }
    }

    return repositories;
};
