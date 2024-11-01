/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for the argument processor.
 * @author DSinc
 */
import { describe, expect, it } from '@jest/globals';
import { licenseFunction } from '../Scoring/licenseFunction';
import { correctnessRepo, licenseScoringMocks, mockValidRepos, rampUpRepo } from '../TestUtils/constants';
import { scoreRampupTime } from '../Scoring/scoreRampupTime';
import { scoreCorrectness } from '../Scoring/scoreCorrectness';
import { scoreBusFactor } from '../Scoring/scoreBusFactor';
import { responsiveFunction } from '../Scoring/responsiveFunction';
import {
    getBusFactorFuncSpy,
    getCorrectnessSpy,
    getLicenseFuncSpy,
    getRampUpFuncSpy,
    getResponsiveFuncSpy,
} from '../TestUtils/mocks';
import { scoreRepository } from '../Scoring/scoring';

describe('Scoring tests', () => {
    it('Should return 0 with a KNOWN invalid license', () => {
        const score = licenseFunction(licenseScoringMocks.repoWithInvalidLicense);
        expect(score).toBe(0);
    });
    it('Should return 1 with a KNOWN valid license', () => {
        const score = licenseFunction(licenseScoringMocks.repoWithValidLicense);
        expect(score).toBe(1);
    });
    it('Should score rampUp', () => {
        const score = scoreRampupTime(rampUpRepo);
        expect(score !== 0 && score !== 1).toBe(true);
    });
    it('Should score correctness', () => {
        const score = scoreCorrectness(correctnessRepo);
        expect(score !== 0 && score !== 1).toBe(true);
    });
    it('Should score bus factor even if the clone cannot be completed', async () => {
        const score = await scoreBusFactor(licenseScoringMocks.repoWithValidLicense);
        expect(score).toBe(0);
    }, 500000);
    it('Should score responsiveness', () => {
        const score = responsiveFunction(correctnessRepo);
        expect(score !== 0 && score !== 1).toBe(true);
    });
    it('Should compute a final scored repository', async () => {
        const licenseFuncSpy = getLicenseFuncSpy(1);
        const responsiveFuncSpy = getResponsiveFuncSpy(1);
        const busFactorSpy = getBusFactorFuncSpy(1);
        const rampupSpy = getRampUpFuncSpy(1);
        const correctnessSpy = getCorrectnessSpy(1);
        const repo = await scoreRepository(mockValidRepos[0]);
        expect(repo.NDJSONRow.License).toBe(1);
        expect(repo.NDJSONRow.ResponsiveMaintainer).toBe(1);
        expect(licenseFuncSpy).toBeCalled();
        expect(responsiveFuncSpy).toBeCalled();
        expect(busFactorSpy).toBeCalled();
        expect(rampupSpy).toBeCalled();
        expect(correctnessSpy).toBeCalled();
    });
});
