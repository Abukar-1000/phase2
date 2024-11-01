/**
 * Please see the individual function documentation for information.
 * This module handles computation of all scores
 * @author DSinc
 */
import { NDJSONRow, Repository } from '../Types/DataTypes';
import { licenseFunction } from './licenseFunction';
import { responsiveFunction } from './responsiveFunction';
import { scoreRampupTime } from './scoreRampupTime';
import { scoreBusFactor } from './scoreBusFactor';
import { scoreCorrectness } from './scoreCorrectness';
import { finalScore } from './finalScore';
import { LogInfo } from '../Utils/log';
import chalk from 'chalk';

function getLatencyInMs(startTime: [number, number]): number {
    const diff = process.hrtime(startTime); // [seconds, nanoseconds]
    return diff[0] * 1000 + diff[1] / 1e6; // Convert to milliseconds
}

/**
 * @author Jorge Puga Hernandez
 * @description - Scores a repository by calling the metric functions created by various team members.
 * The time taken to calculate each metric is recorded in milliseconds and converted into seconds.
 *
 * @template T - The type of the data stored in the repository (generic).
 * @param repo - The repository that must be scored.
 * @returns An updated repository with the calculated metrics and their respective latencies. {@type Repository<T>}
 *
 */
export async function scoreRepository<T>(repo: Repository<T>): Promise<Repository<T>> {
    const netScoreStart = process.hrtime();
    const rampUpStart = process.hrtime();
    const rampup = scoreRampupTime(repo);
    const rampupLatency = getLatencyInMs(rampUpStart);

    const correctnessStart = process.hrtime();
    const correctness = scoreCorrectness(repo);
    const correctnessLatency = getLatencyInMs(correctnessStart);

    const busFactorStart = process.hrtime();
    const busFactor = await scoreBusFactor(repo);
    const busFactorLatency = getLatencyInMs(busFactorStart);

    const responsiveStart = process.hrtime();
    const responsive = responsiveFunction(repo);
    const responsiveLatency = getLatencyInMs(responsiveStart);

    const licenseStart = process.hrtime();
    const license = licenseFunction(repo);
    const licenseLatency = getLatencyInMs(licenseStart);

    let netScore = finalScore(license, [rampup, correctness, busFactor, responsive], [0.25, 0.25, 0.4, 0.1]);
    const netScoreLatency = getLatencyInMs(netScoreStart);

    return {
        ...repo,
        NDJSONRow: {
            ...repo.NDJSONRow,
            NetScore: netScore,
            NetScore_Latency: netScoreLatency,
            RampUp: rampup,
            RampUp_Latency: rampupLatency,
            Correctness: correctness,
            Correctness_Latency: correctnessLatency,
            BusFactor: busFactor,
            BusFactor_Latency: busFactorLatency,
            ResponsiveMaintainer: responsive,
            ResponsiveMaintainer_Latency: responsiveLatency,
            License: license,
            License_Latency: licenseLatency,
        },
    };
}

/**
 * @author Jorge Puga Hernandez
 *
 * @description - Scores an array of repositories by using the map function to
 * apply the 'scorerRepository' function to each repository in the array.
 *
 * @template T - The type of the data stored in each repository.
 * @param repoArr - Array of repositories to score. {@type Repository<T>[]}
 * @returns An updated repository with the calculated metrics and their respective latencies. {@type Repository<T>[]}
 *
 */
export async function scoreRepositoriesArray<Q>(repoArr: Repository<Q>[]): Promise<Repository<Q>[]> {
    let repoBuilder: Repository<Q>[] = [];
    for (const repo of repoArr) {
        LogInfo(
            `${chalk.yellow(`Starting scoring for: `)}${chalk.green(
                repo.repoName
            )}_______________________________`
        );
        const scoredRepo = await scoreRepository(repo);
        LogInfo(
            `${chalk.blue(`Scoring complete for: `)}${chalk.green(
                repo.repoName
            )}_______________________________`
        );
        repoBuilder.push(scoredRepo);
    }
    return repoBuilder;
}
