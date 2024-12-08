/**
 * Constants for fields to test the GQL query
 * @author DSinc
 */

import {
    createLanguagesField,
    createReactionsField,
    createVulnerabilityAlertsField,
    createIssuesField,
    createPackageJsonField,
    createPullRequestsField,
} from './fields';

export const defaultFields = [
    'description',
    'name',
    'url',
    `owner {
        login
    }`,
    `openIssues: issues(states: OPEN) {
        totalCount
    }`,
    `closedIssues: issues(states: CLOSED) {
        totalCount
    }`,
];

export const extraFields = [
    'name',
    `owner {
        login
    }`,
    'stargazerCount',
    'forkCount',
    'updatedAt',
    'pushedAt',
    'isPrivate',
    'isFork',
    `watchers {
        totalCount
    }`,
    `licenseInfo {
        name
        spdxId
        url
    }`,
    `primaryLanguage {
        name
    }`,
    createLanguagesField(10),
    createVulnerabilityAlertsField(10),
    createReactionsField(10),
    createIssuesField(0),
    createPackageJsonField(),
    createPullRequestsField()
];
