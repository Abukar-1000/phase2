/**
 * @author Ben Kanter
 *
 *
 * @param repo - Repository to be scored
 * @param rampup - rampup time score
 * @param correctness - correctness score
 * @param busFactor - bus factor score
 * @param responsive - responsiveness score
 * @param license - license score
 *
 * @return - final score is an average of all scores except for the license. If the license if 0, final score is 0.
 */

import chalk from 'chalk';
import { LogInfo } from '../Utils/log';
import { equalFloat } from '../Utils/utils';

export function finalScore<T>(license: number, scores: number[], weights: number[]): number {
    LogInfo(`Calculating final score...`);
    if (license == 0) {
        LogInfo(`${chalk.yellow('Returing 0 due to license being incompatible')}`);
        return 0;
    }
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const weightedSum = scores.reduce((sum, score, index) => sum + score * weights[index], 0);
    const avg = weightedSum / totalWeight;

    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const finalScore = Math.max(min, Math.min(avg, max));

    if (finalScore < min) {
        LogInfo(`${chalk.red(`FINAL SCORE: ${finalScore} WAS LESS THAN: ${min}`)}`);
    } else if (finalScore > max) {
        LogInfo(`${chalk.red(`FINAL SCORE: ${finalScore} WS GREATER THAN: ${max}`)}`);
    } else if (equalFloat(max, finalScore) || equalFloat(min, finalScore)) {
        LogInfo(`${chalk.green(`FINAL SCORE ${finalScore} EQUALIED: ${min},${max} `)}`);
    } else {
        LogInfo(`${chalk.green(`FINAL SCORE ${finalScore} WAS BETWEEN: ${min},${max} `)}`);
    }

    return finalScore;
}
