/**
 * This module only contains types for various data objects in our project.
 * @author DSinc
 */
export type NDJSONRow = Partial<{
    URL: string;
    NetScore: number;
    NetScore_Latency: number;
    RampUp: number;
    RampUp_Latency: number;
    Correctness: number;
    Correctness_Latency: number;
    BusFactor: number;
    BusFactor_Latency: number;
    ResponsiveMaintainer: number;
    ResponsiveMaintainer_Latency: number;
    License: number;
    License_Latency: number;
}>;

export type NDJSONRows = NDJSONRow[];

export type QueryParams = { owner: string; repoName: string };

export type ResultType<T> = {
    [key: `repo${number}`]: T;
};

export type TestsFilesFromQuery = {
    name: string;
    type: string;
}[];

export type Repository<T> = {
    owner: string;
    repoName: string;
    description?: string;
    repoUrl?: string;
    fileUrl: string;
    queryResult:
        | ({
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
          } & T)
        | null;
    NDJSONRow: NDJSONRow;
};
