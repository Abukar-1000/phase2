/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for the repo query builder
 * @author DSinc
 */
import { describe, expect, it } from '@jest/globals';
import { buildRepoSchemaQuery, repoQueryBuilder } from '../Requests/QueryBuilders/repos';
import { mockRepos, repoSchemaQueryString } from '../TestUtils/constants';
import { defaultFields } from '../Requests/QueryBuilders/constants';

/**
 * John Leidy
 * This block is responsible for testing the query string builder.
 * See the it statements for information on what each test does.
 */
describe('Repo Query Builder', () => {
    it('Should return an empty query if Repo arr length is 0', () => {
        const query = repoQueryBuilder([]);
        expect(query.includes('query')).toBe(true);
        expect(query.includes('repo')).toBe(false);
    });
    it('Should return a query containing repo information if repos are given', () => {
        const query = repoQueryBuilder(mockRepos);
        mockRepos.forEach((repo) => {
            expect(query.includes(repo.owner)).toBe(true);
            expect(query.includes(repo.repoName)).toBe(true);
        });
    });
    it('Should automatically include default fields', () => {
        const query = repoQueryBuilder(mockRepos);
        defaultFields.forEach((field) => {
            expect(query.includes(field)).toBe(true);
        });
    });
    it('Should include extra fields along with defaults if given', () => {
        const extraFields = ['someField', 'anotherExtraField'];
        const query = repoQueryBuilder(mockRepos, extraFields);
        extraFields.forEach((field) => {
            expect(query.includes(field)).toBe(true);
        });
    });
    it('Should build the repoSchemaQuery', () => {
        const query = buildRepoSchemaQuery();
        expect(query).toBe(repoSchemaQueryString);
    });
});
