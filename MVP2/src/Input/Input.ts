/**
 * Please see the individual function documentation for information.
 * This module processes input
 * @author DSinc
 */

export const DEFAULT_URLFILEPATH = './src/Input/example.txt';

import { boolean } from 'yargs';
import { readFileSync } from 'fs';

/**
 * @author Dorian Bell II ; John Leidy
 * @description
 * Reads the file at the given filepath. Retrieves its contents line-by-line
 *
 *
 * @param filepath - The path to the file containing the urls
 * @returns An array of urls {@type string[] | undefined}
 *
 * @throws
 * This function throws an error if the filepath is invalid
 *
 * @remarks
 * The function expects each line to be a different module link.
 * Each link must be to a GitHub repo or an npm listing that has a
 * corresponding GitHub repo.
 *
 */
export function TryReadUrlFile(filepath: string): string[] | undefined {
    try {
        // Immediately throw if there's no filepath provided
        if (!filepath) {
            throw new Error('Invalid filepath provided.');
        }

        var fileContents = readFileSync(filepath, 'utf8');
        const urls = fileContents.split(/\r?\n/).filter((line) => line.trim() !== '');
        return urls;
    } catch (e) {
        throw e;
    }
}

/**
 * @author Dorian Bell II
 * @description
 * Reads the file at the given filepath and returns a string array containing its lines.
 *
 *
 * @param filepath - The path to the file containing the urls
 * @param useDefault - y/n try the default filepath if the specified on fails
 * @returns An array of urls {@type string[]}
 *
 * @remarks
 * The function never returns undefined, and it never escalates an error.
 * If a failure occurs, a 1x1 array of empty string will be returned
 */
export function ReadURLFile(filepath: string, useDefault: boolean = false): string[] {
    try {
        const urls = TryReadUrlFile(filepath);
        if (urls) {
            return urls;
        }
        return useDefault ? ReadDefaultFile() : [''];
    } catch (e) {
        return useDefault ? ReadDefaultFile() : [''];
    }
}

/**
 * @author Dorian Bell II
 * @description
 * Reads the file at the defeault filepath, DEFAULT_URLFILEPATH.
 *
 *
 * @returns An array of urls {@type string[]}
 *
 * @remarks
 * The function never returns undefined, and it never escalates an error.
 * If a failure occurs, a 1x1 array of empty string will be returned
 */
function ReadDefaultFile(): string[] {
    try {
        const urls = TryReadUrlFile(DEFAULT_URLFILEPATH);
        if (urls) {
            return urls;
        }
        return [''];
    } catch (e) {
        return [''];
    }
}
