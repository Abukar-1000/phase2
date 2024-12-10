/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for the url processor.
 * @author DSinc
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { buildReposFromUrls } from '../Processors/urlProcessor';
import { fetchPackageInfo } from '../Requests/Npm/registry';
import { mockUrls } from '../TestUtils/constants';
import { getFetchSpy, getMockedCleanUrls } from '../TestUtils/mocks';
import { TryReadUrlFile } from '../Input/Input';

/**
 * John Leidy
 * A global fetch mock for use in the calls when building repos from urls
 */
jest.spyOn(global, 'fetch').mockImplementation(
    async (input: string | URL | Request, init?: RequestInit | undefined) => {
        const bodyObj = {
            repository: {
                type: 'some repo',
                url: 'a url',
            },
        };
        const blob = new Blob([JSON.stringify(bodyObj, null, 2)], {
            type: 'application/json',
        });
        return new Response(blob, { status: 200 });
    }
);

/**
 * John Leidy
 * this block tests the urlProcessor. The it statements will explain what this does.
 */
describe('urlProcessor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('Should build an array of repositories from urls', async () => {
        const repos = await buildReposFromUrls(getMockedCleanUrls());
        const validUrls = TryReadUrlFile('./src/TestUtils/validUrls.txt');
        expect(validUrls).toBeTruthy();
        validUrls &&
            repos.forEach((repo) => {
                expect(validUrls.includes(repo.fileUrl)).toBe(true);
            });
    });

    it('should reach out to the registry if a url includes npmjs or package', async () => {
        const repos = await buildReposFromUrls(getMockedCleanUrls());
        expect(fetch).toHaveBeenCalledTimes(5);
    });

    it('should throw an error if the response from the npm registry is not ok', async () => {
        const fetchSpy = getFetchSpy(
            {
                repository: {
                    type: 'some repo',
                    url: 'a url',
                },
            },
            404,
            true
        );
        try {
            const repos = await buildReposFromUrls(getMockedCleanUrls());
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });

    it('should be okay processing invalid urls', async () => {
        const repos = await buildReposFromUrls(getMockedCleanUrls('./src/TestUtils/invalidUrls.txt'));
        repos.forEach((repo) => {
            expect(mockUrls.includes(repo.fileUrl)).toBe(true);
        });
    });
});
