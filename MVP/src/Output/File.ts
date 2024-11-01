/**
 * Please see the individual function documentation for information.
 * This writes results to files in various formats.
 * @author DSinc
 */

import { writeFile } from 'fs/promises';
import { NDJSONRow, Repository } from '../Types/DataTypes';
import { convertNDJSONObjToStr } from './CLI';
import { existsSync, mkdirSync } from 'fs';

/**
 *@author John Leidy
 * @description This writes our NDJSONRows to a txt file
 * @param repos Repositories array of cleaned repositories {@type Repository<T>[]}
 * @returns a promise {@type Promise<void>}
 */
export const writeToTXT = async <T>(repos: Repository<T>[], filePath?: string) =>
    writeFile(
        filePath ? `${filePath}RESULTS.txt` : './results/RESULTS.txt',
        repos.map((repo) => convertNDJSONObjToStr(repo.NDJSONRow)).join('\n')
    );

/**
 * @autor John Leidy
 * @description This function writes our NDJSON rows to a json file in an array
 *
 * @param repos Repositories array of cleaned repositories {@type Repository<T>[]}
 * @returns a promise {@type Promise<void>}
 */
export const writeToJSONArr = async <T>(repos: Repository<T>[], filePath?: string) =>
    writeFile(
        filePath ? `${filePath}RESULTSarr.json` : './results/RESULTSarr.json',
        `[\n   ${repos.map((repo) => convertNDJSONObjToStr(repo.NDJSONRow)).join(',\n   ')}\n]`
    );

/**
 * @author John Leidy
 * @description This function utilizes Array.prototype.reduce to build an object with
 * keys that are the repositories name and values that are an object with the key NDJSONrow
 * This keys value is the corresponding NDJSONRow for that repository. No return statement :D
 * @param repos An array of cleaned repositories {@type Repository<T>[]}
 * @returns a promise {@type Promise<void>}
 */
export const writeToJSONObjs = async <T>(repos: Repository<T>[], filePath?: string) =>
    writeFile(
        filePath ? `${filePath}RESULTSobjs.json` : './results/RESULTSobjs.json',
        `${JSON.stringify(
            repos.reduce(
                (acc, repo) => ({ ...acc, [repo.repoName]: { NDJSONRow: repo.NDJSONRow } }),
                {} as Record<string, { NDJSONRow: NDJSONRow }>
            ),
            null,
            4
        )}`
    );

/**
 * @author John Leidy
 * @description a function to ensure the output directory exists, create if not
 * @param filePath the path the user wants to create a results file in {@type string|undefined}
 * @returns nothing {@type void}
 */
export const ensureDirExists = (filePath?: string) => {
    if (!existsSync(filePath ? filePath : './results/')) {
        mkdirSync(filePath ? filePath : './results/');
    }
};

export const writeNDJSONToFile = async <T>(repos: Repository<T>[], filePath?: string) => {
    ensureDirExists();
    await writeToTXT(repos, filePath);
    await writeToJSONArr(repos, filePath);
    await writeToJSONObjs(repos, filePath);
};
