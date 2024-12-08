/**
 * Please see the individual function documentation for information.
 * This module handles CLI output.
 * @author DSinc
 */
import * as fs from 'fs';
import * as path from 'path';
import { NDJSONRow, Repository } from '../Types/DataTypes';

/**
 * Writes NDJSON formatted repository data to the CLI.
 * @param repos - Array of repositories containing NDJSON rows.
 */
export const writeNDJSONToCLI = <T>(repos: Repository<T>[]) => {
    repos.forEach((repo) => {
        console.log(convertNDJSONObjToStr(repo.NDJSONRow));
    });
};

/**
 * Prints the total count of dependencies and devDependencies from the package.json file.
 */
export const printDependencyCount = () => {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};
    const totalDependencies = Object.keys(dependencies).length + Object.keys(devDependencies).length;
    console.log(`\n${totalDependencies} dependencies installed...`);
};

/**
 * Prints the test results from the output.txt file.
 * If the file does not exist, it logs 'Test results not found.'
 */
export const printTestResults = () => {
    const outputPath = path.resolve(__dirname, '../../coverage/output.txt');
    const coverageSummaryPath = path.resolve(__dirname, '../../coverage/coverage-summary.json');

    if (fs.existsSync(outputPath) && fs.existsSync(coverageSummaryPath)) {
        const outputContent = fs.readFileSync(outputPath, 'utf-8');
        const coverageSummary = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf-8'));

        const testResultsLine = outputContent.split('\n').find((line) => line.includes('Tests:'));
        if (testResultsLine) {
            const match = testResultsLine.match(/Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed,\s+(\d+)\s+total/);
            if (match) {
                const failedTests = parseInt(match[1], 10);
                const passedTests = parseInt(match[2], 10);
                const totalTests = parseInt(match[3], 10);
                const totalCoverage = ((passedTests / totalTests) * 100).toFixed(0);

                console.log(`Total: ${totalTests}`);
                console.log(`Passed: ${passedTests}`);
                console.log(`Coverage: ${totalCoverage}%`);
                console.log(
                    `${passedTests}/${totalTests} test cases passed. ${totalCoverage}% line coverage achieved.`
                );
            } else {
                console.log('Test results line not in expected format.');
            }
        } else {
            console.log('Test results line not found.');
        }
    } else {
        console.log('Test results not found.');
    }
};

/**
 * Processes an input file containing URLs, formats them into objects with initial scores, and prints each object as a JSON string.
 * @param filePath - Path to the input file.
 */
export const processInputFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const urls = fileContent.split('\n').filter((line) => line.trim() !== '');
        const formattedUrls = urls.map((url) => ({
            URL: url,
            NET_SCORE: 0,
            RAMP_UP_SCORE: 0,
            CORRECTNESS_SCORE: 0,
            BUS_FACTOR_SCORE: 0,
            RESPONSIVE_MAINTAINER_SCORE: 0,
            LICENSE_SCORE: 0,
        }));

        // Sort the formatted URLs by NET_SCORE in descending order
        formattedUrls.sort((a, b) => b.NET_SCORE - a.NET_SCORE);

        formattedUrls.forEach((urlObj) => {
            console.log(JSON.stringify(urlObj));
        });
    } else {
        console.log(`File not found: ${filePath}`);
    }
};

/**
 * Converts an NDJSON object to a string.
 * @param NDJSONObj - The NDJSON object to convert.
 * @returns The stringified NDJSON object.
 */
/**
 * Converts an NDJSON object to a string.
 * @param NDJSONObj - The NDJSON object to convert.
 * @returns The stringified NDJSON object.
 */
export const convertNDJSONObjToStr = (NDJSONObj: NDJSONRow) => JSON.stringify(NDJSONObj);
