/**
 * Please see the individual function documentation for information.
 * This module prints coverage in the proper format.
 * @author DSinc
 */

import fs from 'fs';

type CoverageInfo = { total: number; covered: number; skipped: number; pct: number };

type IndvCoverage =
    | {
          lines?: CoverageInfo;
          statements?: CoverageInfo;
          functions?: CoverageInfo;
          branches?: CoverageInfo;
          branchesTrue?: CoverageInfo;
      }
    | undefined;
type CoverageData = {
    total?: IndvCoverage;
    [key: string]: IndvCoverage;
};
type ParsedJestOutput = {
    testsPassed: number | null;
    totalTests: number | null;
};

/**
 * @author John Leidy
 * @description a function to read the coverage summary and return the total percentage
 * @returns a percentage {@type number}
 */
export const getLinePercentCoverage = (): number => {
    const rawData = fs.readFileSync('coverage/coverage-summary.json', 'utf8');
    const coverageData: CoverageData = JSON.parse(rawData);
    if (coverageData && coverageData.total?.lines?.pct) {
        return coverageData.total.lines.pct;
    } else return 0;
};

/**
 * @author John Leidy
 * @description A function to parse the output.txt file we write stdout to.
 * @returns an object {@type {testsPassed:number, totalTests:number}}
 */
export const parseJestOutput = (): ParsedJestOutput => {
    const output = fs.readFileSync('coverage/output.txt', 'utf8');
    const testsRegex = /Tests:\s*(\d+)\s*passed,\s*(\d+)\s*total/;
    const testsMatch = output.match(testsRegex);
    const testsPassed = testsMatch ? parseInt(testsMatch[1], 10) : null;
    const totalTests = testsMatch ? parseInt(testsMatch[2], 10) : null;

    return { testsPassed, totalTests };
};

/**
 * @author John Leidy
 * @description A function to show our test output posttest
 * @returns nothing {@type void}
 */
export const showTestMetrics = () => {
    const percentLinesTotal = getLinePercentCoverage();
    const testsResults = parseJestOutput();
    console.log(
        `${testsResults.testsPassed}/${testsResults.totalTests} test cases passed. ${Math.round(
            percentLinesTotal
        )}% line coverage achieved.`
    );
};
