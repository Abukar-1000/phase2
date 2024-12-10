/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for the categorizerr.
 * @author DSinc
 */

import { CategorizeModules } from '../Output/categorizer';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Repository } from '../Types/DataTypes';

// Fake Compatible Repo
const mockForCompatibleRepo: Repository<any> = {
    owner: 'jorge',
    repoName: 'jorgesrepo',
    description: 'a description',
    repoUrl: 'a url',
    fileUrl: 'a file url',
    queryResult: null,
    NDJSONRow: {
        NetScore: 0.8,
    },
};

// Fake Incompatible Repo
const mockForIncompatibleRepo: Repository<any> = {
    owner: 'jorge',
    repoName: 'jorgesrepo',
    description: 'a description',
    repoUrl: 'a url',
    fileUrl: 'a file url',
    queryResult: null,
    NDJSONRow: {
        NetScore: 0.4,
    },
};

// Test the module categorizer.
// Recall that >0.6 is compatible else, incompatible.
describe('Categorize Modules Test', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Should categorize between compatible and incompatible modules', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const mockRepos = [mockForCompatibleRepo, mockForIncompatibleRepo];
        CategorizeModules(mockRepos);

        // Compatible console log message.
        expect(logSpy).toHaveBeenCalledWith('\nCompatible modules:');
        expect(logSpy).toHaveBeenCalledWith(JSON.stringify(mockForCompatibleRepo, null, 2));

        // Incompatible console log message.
        expect(logSpy).toHaveBeenCalledWith('\nIncompatible modules:');
        expect(logSpy).toHaveBeenCalledWith(JSON.stringify(mockForIncompatibleRepo, null, 2));
    });

    it('Should categorize compatible modules only if none are incompatible', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        CategorizeModules([mockForCompatibleRepo]);

        // Compatible console log message and a no incompatible modules message.
        expect(logSpy).toHaveBeenCalledWith('\nCompatible modules:');
        expect(logSpy).toHaveBeenCalledWith(JSON.stringify(mockForCompatibleRepo, null, 2));
        expect(logSpy).toHaveBeenCalledWith('\nNo incompatible modules found!');
    });

    it('Should categorize incompatible modules only if none are compatible', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        CategorizeModules([mockForIncompatibleRepo]);

        // Compatible console log message and a no incompatible modules message.
        expect(logSpy).toHaveBeenCalledWith('\nNo compatible modules found!');
        expect(logSpy).toHaveBeenCalledWith('\nIncompatible modules:');
        expect(logSpy).toHaveBeenCalledWith(JSON.stringify(mockForIncompatibleRepo, null, 2));
    });

    it('Show the case where we have neither compatible or incompatible', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        CategorizeModules([]);

        // Neither compatible or incompatible console log message.
        expect(logSpy).toHaveBeenCalledWith('\nNo compatible modules found!');
        expect(logSpy).toHaveBeenCalledWith('\nNo incompatible modules found!');
    });
});
