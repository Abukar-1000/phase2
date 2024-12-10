/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for file writing
 * @author DSinc
 */
import { describe, expect, it } from '@jest/globals';
import {
    ensureDirExists,
    writeNDJSONToFile,
    writeToJSONArr,
    writeToJSONObjs,
    writeToTXT,
} from '../Output/File';
import { mockRepos } from '../TestUtils/constants';
import { TryReadUrlFile } from '../Input/Input';
import { readFileSync } from 'fs';
import { NDJSONRows, Repository } from '../Types/DataTypes';

type JSONObjFile = {
    [key: string]: Repository<any>;
};

const outputDump = './src/TestUtils/OutputDumps/';

describe('File Output', () => {
    it('Should create txt file with newline delimited NDJSONRows', async () => {
        ensureDirExists(outputDump);
        await writeToTXT(mockRepos, outputDump);
        const urls = TryReadUrlFile(`${outputDump}RESULTS.txt`);
        expect(urls).toBeTruthy();
        mockRepos.forEach((repo) => {
            expect(urls?.some((url) => url.includes(repo.fileUrl)));
        });
    });
    it('Should create a json file with an arr of NDJSONRows', async () => {
        ensureDirExists(outputDump);
        await writeToJSONArr(mockRepos, outputDump);
        const json: NDJSONRows = JSON.parse(readFileSync(`${outputDump}RESULTSarr.json`, 'utf-8'));
        expect(json).toBeTruthy();
        mockRepos.forEach((repo) => {
            expect(json.some((row) => row.URL === repo.fileUrl)).toBe(true);
        });
    });
    it('Should create a json file with objs and keys that are the repo name', async () => {
        ensureDirExists(outputDump);
        await writeToJSONObjs(mockRepos, outputDump);
        const json: JSONObjFile = JSON.parse(readFileSync(`${outputDump}RESULTSobjs.json`, 'utf-8'));
        expect(json).toBeTruthy();
        mockRepos.forEach((repo) => {
            expect(Object.entries(json).some((entry) => entry[0] === repo.repoName)).toBe(true);
        });
    });
    it('Should create all three files', async () => {
        ensureDirExists(outputDump);
        await writeNDJSONToFile(mockRepos, outputDump);
        const jsonobjs: JSONObjFile = JSON.parse(readFileSync(`${outputDump}RESULTSobjs.json`, 'utf-8'));
        const jsonarr: NDJSONRows = JSON.parse(readFileSync(`${outputDump}RESULTSarr.json`, 'utf-8'));
        const urls = TryReadUrlFile(`${outputDump}RESULTS.txt`);
        expect(jsonarr).toBeTruthy();
        expect(urls).toBeTruthy();
        expect(jsonobjs).toBeTruthy();
    });
});
