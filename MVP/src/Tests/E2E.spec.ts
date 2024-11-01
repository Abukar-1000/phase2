/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for the E2E
 * @author DSinc
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { buildReposFromUrls } from '../Processors/urlProcessor';
import { BaseRepoQueryResponse, GraphQLResponse, ReposFromQuery } from '../Types/ResponseTypes';
import { mockGQLResult } from '../TestUtils/constants';
import {
    getBusFactorFuncSpy,
    getCorrectnessSpy,
    getLicenseFuncSpy,
    getMockedCleanUrls,
    getRampUpFuncSpy,
    getResponsiveFuncSpy,
} from '../TestUtils/mocks';
import { repoQueryBuilder } from '../Requests/QueryBuilders/repos';
import { createLicenseField } from '../Requests/QueryBuilders/fields';
import { requestFromGQL } from '../Requests/GitHub/gql';
import * as GQLREQ from '../Requests/GitHub/gql';
import { mapGQLResultToRepos } from '../Processors/gqlProcessor';
import { Repository } from '../Types/DataTypes';
import * as NPMPROCESSOR from '../Processors/registryProcessor';
import { scoreRepositoriesArray } from '../Scoring/scoring';
import { writeNDJSONToCLI } from '../Output/CLI';

describe('E2E', () => {
    it('Should work with an E2E test', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        //mocked to avoid using fetch during testing
        const getRepoUrlSpy = jest
            .spyOn(NPMPROCESSOR, 'getRepoUrl')
            .mockImplementation(async (packageName: string) => '');
        const repos = await buildReposFromUrls<BaseRepoQueryResponse>(
            getMockedCleanUrls('../TestUtils/validUrls.txt')
        );
        const query = repoQueryBuilder(repos, [createLicenseField(), 'stargazerCount']);
        //we spy on this req and mock the return to avoid actually fetching or needing a token in this test
        const reqGqlSpy = jest
            .spyOn(GQLREQ, 'requestFromGQL')
            .mockImplementation(
                async (query: string): Promise<GraphQLResponse<{ repo: Repository<any> }>> => mockGQLResult
            );
        const result = await requestFromGQL<ReposFromQuery<any>>(query);
        const cleanedRepos = mapGQLResultToRepos(result, repos);
        //can remove this for a full E2E test, it involves filesystem manipulation, cloning repositories etc, works with or without. Shorter run without.
        //const busFactSpy = getBusFactorFuncSpy(1);
        const licenseFuncSpy = getLicenseFuncSpy(1);
        const scoredRepositories = await scoreRepositoriesArray(cleanedRepos);
        writeNDJSONToCLI(scoredRepositories);
        expect(scoredRepositories.some((repo) => (repo.repoName = 'kotaemon'))).toBe(true);
        expect(scoredRepositories.some((repo) => (repo.repoName = 'hackingtool'))).toBe(true);
    }, 20000);

    it('Should perfom E2E test with mocks', async () => {
        const licenseFuncSpy = getLicenseFuncSpy(1);
        const responsiveFuncSpy = getResponsiveFuncSpy(1);
        const busFactorSpy = getBusFactorFuncSpy(1);
        const rampupSpy = getRampUpFuncSpy(1);
        const correctnessSpy = getCorrectnessSpy(1);
        const reqGqlSpy = jest
            .spyOn(GQLREQ, 'requestFromGQL')
            .mockImplementation(
                async (query: string): Promise<GraphQLResponse<{ repo: Repository<any> }>> => mockGQLResult
            );
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        //mocked to avoid using fetch during testing
        const getRepoUrlSpy = jest
            .spyOn(NPMPROCESSOR, 'getRepoUrl')
            .mockImplementation(async (packageName: string) => '');

        const repos = await buildReposFromUrls<BaseRepoQueryResponse>(
            getMockedCleanUrls('../TestUtils/validUrls.txt')
        );
        const query = repoQueryBuilder(repos, [createLicenseField(), 'stargazerCount']);
        const result = await requestFromGQL<ReposFromQuery<any>>(query);
        const cleanedRepos = mapGQLResultToRepos(result, repos);
        const scoredRepositories = await scoreRepositoriesArray(cleanedRepos);
        expect(scoredRepositories.some((repo) => (repo.repoName = 'kotaemon'))).toBe(true);
        expect(scoredRepositories.some((repo) => (repo.repoName = 'hackingtool'))).toBe(true);
    }, 20000);
});
