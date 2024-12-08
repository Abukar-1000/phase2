/**
 * This module only contains types for various request type objects in our project.
 * @author DSinc
 */
export type ErrorLocation = {
    line: number;
    column: number;
};

export type ErrorLocations = ErrorLocation[];

export type GraphQLError = {
    type: string;
    path: string[];
    locations: ErrorLocations;
    message: string;
};

export type RepositoryFromQuery = {
    name: string;
    description: string;
    repoUrl: string;
    fileUrl: string;
    [key: string]: string;
};
export type ReposFromQuery<T> = {
    [key: string]: ({ owner: { login: string }; name: string; url: string; description: string } & T) | null;
};

export interface GraphQLResponse<T> {
    data: T;
    errors?: GraphQLError[];
    message?: string;
    status?: string;
}

export interface NPMRegistryResponse {
    repository?: {
        type?: string;
        url?: string;
    };
}

type RepoQueryResult = {
    description: string;
    name: string;
    url: string;
};
export interface BaseRepoQueryResponse {
    name: string;
    description: string;
    url: string;
    name: string;
    url: string;
    description: string;
    licenseInfo?: {
        name: string;
    };
    openIssues?: {
        totalCount: number;
    };
    closedIssues?: {
        totalCount: number;
    };
    stargazerCount?: number;

    licenseInfo?: { name?: string };
    ref?: { target?: { history: { edges?: [{ node: { author: { name: string } } }] } } };
    readmeFile?: { text: string };
    testsCheckMain?: { entries: TestsFilesFromQuery };
    testsCheckMaster?: { entries: TestsFilesFromQuery };
    packageJson?:{
        text: string;
    };

    pullRequests?: {
        nodes: Array<{
            additions: number;
            reviews: {
                totalCount: number;
            };
        }>;
    };
}
