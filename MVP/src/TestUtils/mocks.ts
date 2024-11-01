/**
 * This module only contains mocks for our tests.
 * @author DSinc
 */
import { jest } from '@jest/globals';
import { ProvideURLsForQuerying } from '../Input/Sanitize';
import * as LICENSESCORING from '../Scoring/licenseFunction';
import * as RESPONSIVESCORING from '../Scoring/responsiveFunction';
import * as BUSFACTORSCORING from '../Scoring/scoreBusFactor';
import * as RAMPUPSCORING from '../Scoring/scoreRampupTime';
import * as CORRECTNESSSCORING from '../Scoring/scoreCorrectness';

/**
 * John Leidy
 * General fetch spy and mock. This is used to prevent actual network calls being performed during unit testing.
 */
export const getFetchSpy = <T>(returnBody: T, statusCode: number, throwAnError?: boolean) =>
    jest
        .spyOn(global, 'fetch')
        .mockImplementation(async (input: string | URL | Request, init?: RequestInit | undefined) => {
            if (throwAnError === true) {
                throw new Error('fetch spy threw an error');
            }
            //A blob
            const blob = new Blob([JSON.stringify(returnBody, null, 2)], {
                type: 'application/json',
            });
            //the mock response object fetch will return when called
            return new Response(blob, { status: statusCode });
        });

export const getLicenseFuncSpy = (returnValue: number) =>
    jest.spyOn(LICENSESCORING, 'licenseFunction').mockImplementation((repo) => returnValue);

export const getResponsiveFuncSpy = (returnValue: number) =>
    jest.spyOn(RESPONSIVESCORING, 'responsiveFunction').mockImplementation((repo) => returnValue);

export const getBusFactorFuncSpy = (returnValue: number) =>
    jest.spyOn(BUSFACTORSCORING, 'scoreBusFactor').mockImplementation(async (repo) => returnValue);

export const getRampUpFuncSpy = (returnValue: number) =>
    jest.spyOn(RAMPUPSCORING, 'scoreRampupTime').mockImplementation((repo) => returnValue);

export const getCorrectnessSpy = (returnValue: number) =>
    jest.spyOn(CORRECTNESSSCORING, 'scoreCorrectness').mockImplementation((repo) => returnValue);

export const getMockedCleanUrls = (filepath?: string) => {
    const cleanUrls = ProvideURLsForQuerying(filepath ? filepath : './src/TestUtils/example.txt', true);
    return cleanUrls;
};
