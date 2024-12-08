/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for the gql processor
 * @author DSinc
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { mockGQLResult, mockRepos, mockValidRepos } from '../TestUtils/constants';
import { mapGQLResultToRepos } from '../Processors/gqlProcessor';

/**
 * John Leidy
 * GQL Processor tests
 * The test in here uses a mocked GQL result with some null entries to ensure that the mapper properly removes them and appends
 * the query result to the repositories where appropriate. (successful query for that repo)
 */
describe('GQL Processor', () => {
    beforeEach(() => {
        //keep output during testing clean
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    it('Should remove repos that have a null response from GQL', () => {
        const cleanedRepos = mapGQLResultToRepos(mockGQLResult, mockRepos);
        cleanedRepos.forEach((cleanRepo) => {
            const repoInValidRepos = mockValidRepos.find((repo) => repo.fileUrl === cleanRepo.fileUrl);
            if (repoInValidRepos) {
                expect(cleanRepo).toMatchObject(repoInValidRepos);
            }
        });
    });
});
