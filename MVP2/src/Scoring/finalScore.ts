import chalk from 'chalk';
import { LogInfo } from '../Utils/log';
import { equalFloat } from '../Utils/utils';

/**
 * @author Ben
 *
 * @param license - license score
 * @param scores - array of individual scores
 * @param weights - corresponding weights for the scores
 *
 * @return final score is an average of all scores except for the license.
 *         If the license is 0, the final score is 0.
 *         The final score is scaled to boost lower values while keeping it between 0 and 1.
 */
export function finalScore<T>(license: number, scores: number[], weights: number[]): number {
    LogInfo(`Calculating final score...`);

    if (license === 0) {
        LogInfo(`${chalk.yellow('Returning 0 due to license being incompatible')}`);
        return 0;
    }

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    if (totalWeight === 0) {
        LogInfo(`${chalk.red('Total weight is zero. Cannot compute final score.')}`);
        return 0;
    }

    const weightedSum = scores.reduce((sum, score, index) => sum + score * weights[index], 0);
    const avg = weightedSum / totalWeight;

    //apply exponential scaling to boost the score
    const scaledScore = boostScore(avg);

    //clamp the scaled score between 0 and 1
    const finalScore = Math.min(Math.max(scaledScore, 0), 1);

    LogFinalScore(avg, finalScore, scores);

    return finalScore;
}

/**
 * Boosts the score using exponential scaling with a higher boost.
 * Adjust the exponent to control the boost intensity.
 *
 * @param score - The original average score
 * @returns - The boosted score
 */
function boostScore(score: number): number {
    //exponential scaling with exponent 3 for a higher boost
    const exponent = 4;
    return 1 - Math.pow(1 - score, exponent);

}


function LogFinalScore(originalAvg: number, finalScore: number, scores: number[]): void {
    const min = Math.min(...scores);
    const max = Math.max(...scores);

    if (finalScore < min) {
        LogInfo(`${chalk.red(`FINAL SCORE: ${finalScore.toFixed(2)} WAS LESS THAN: ${min}`)}`);
    } else if (finalScore > max) {
        LogInfo(`${chalk.red(`FINAL SCORE: ${finalScore.toFixed(2)} WAS GREATER THAN: ${max}`)}`);
    } else if (equalFloat(max, finalScore) || equalFloat(min, finalScore)) {
        LogInfo(`${chalk.green(`FINAL SCORE ${finalScore.toFixed(2)} EQUALIZED: ${min}, ${max}`)}`);
    } else {
        LogInfo(`${chalk.green(`FINAL SCORE ${finalScore.toFixed(2)} WAS BETWEEN: ${min}, ${max}`)}`);
    }
}
