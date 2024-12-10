/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests the registry processor
 * @author DSinc
 */
import { describe, expect, it, jest } from '@jest/globals';
import { processNpmUrl } from '../Processors/registryProcessor';
import { getFetchSpy } from '../TestUtils/mocks';
import { beforeEach } from 'node:test';
import { registryMocking } from '../TestUtils/constants';

describe('Registry Processor', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('Should return undefined instead of a repo if params are not present', async () => {
        const fetchSpy = getFetchSpy({}, 404, false);

        const repo = await processNpmUrl(registryMocking.invalidPackageUrl);
        expect(repo).toBe(undefined);
    });
    it('Should return undefined if the function is given an undefined data element', async () => {
        const repo = await processNpmUrl(undefined);
        expect(repo).toBe(undefined);
    });
    it('Should return a repo if the npm package is valid', async () => {
        const fetchSpy = getFetchSpy(registryMocking.validPackageNpmResponse, 200, false);
        const repo = await processNpmUrl(registryMocking.validPackageUrl);
        expect(fetchSpy).toBeCalledTimes(2);
        expect(repo).toBeTruthy();
        expect(repo?.fileUrl).toBe(registryMocking.validPackageUrl?.raw);
    });
});
