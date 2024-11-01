/**
 * @author Ben Kanter
 * Accepts a repository
 * Pull number of open and closed issues to obtain score
 *
 * @param repo - Repository to be scored
 * @returns Score calculated by 1 - (open issues / total issues)
 */

import chalk from 'chalk';
import { Repository, NDJSONRow } from '../Types/DataTypes';
import { LogDebug, LogInfo } from '../Utils/log';

const hasTests = <T>(repo: Repository<T>) => {
    const testDirs = ['tests', 'test', 'e2e', 'testing', 'spec'];
    if (repo.queryResult?.testsCheckMaster) {
        LogInfo(`Repo ${repo.repoName} had a master branch, checking if it has test dir`);
        return repo.queryResult.testsCheckMaster.entries.some((entry) => testDirs.includes(entry.name));
    } else if (repo.queryResult?.testsCheckMain) {
        LogInfo(`Repo ${repo.repoName} had a main branch, checking if it has test dir`);
        return repo.queryResult.testsCheckMain.entries.some((entry) => testDirs.includes(entry.name));
    }
};

export function scoreCorrectness<T>(repo: Repository<T>): number {
    const tests = hasTests(repo);
    LogInfo(`Repo: ${repo.repoName} ${tests ? 'has' : 'does not have'} tests`);
    const openIssuesCount = repo.queryResult?.openIssues?.totalCount!;
    const closedIssuesCount = repo.queryResult?.closedIssues?.totalCount!;
    const goodRatio = 0.1;
    LogDebug(`Open issues: ${openIssuesCount}`);
    LogDebug(`Closed issues: ${closedIssuesCount}`);
    if (closedIssuesCount === 0) {
        LogDebug('No Closed Issues');
        return 0;
    }
    const ratio = openIssuesCount / closedIssuesCount;
    let score = ratio / goodRatio;
    if (tests) {
        score = Math.max(0.5, score);
    } else {
        score = Math.min(score, 0.49);
    }
    LogInfo(`Score ${!tests ? 'should be' : 'should not be'} less than 5`);
    LogInfo(
        tests
            ? `${chalk.green(`${repo.repoName} HAS TESTS, final score: ${Math.min(score, 1)}`)}`
            : `${chalk.red(`${repo.repoName} DOES NOT HAVE TESTS, final score ${Math.min(score, 1)}`)}`
    );
    return Math.min(score, 1);
}
