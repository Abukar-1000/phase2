import { Repository } from '../Types/DataTypes';

/**
 * Tim Carpenter
 *
 * Evaluates the responsiveness score of a repository as a ratio of open and closed issues
 *
 * @template T - The type of the data stored in the repository (generic)
 * @param {Repository<T>} repo - The repository to be evaluated
 * @returns 0-1 - Score between 0 and 1
 *
 */
export function responsiveFunction<T>(repo: Repository<T>): number {
    const open = repo.queryResult?.openIssues?.totalCount!;
    const closed = repo.queryResult?.closedIssues?.totalCount!;
    const goodRatio = 2;
    const ratio = open / closed;
    var score = Math.min(ratio / goodRatio, 1);

    // If issues can't be found, score is NaN, must be set to 0
    if (Number.isNaN(score)) {
        score = 0;
    }

    return score;
}
