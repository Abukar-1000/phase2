import { Repository } from '../Types/DataTypes';

export function scoreCodeReview<T>(repo: Repository<T>): number {
  const pullRequests = repo.queryResult?.pullRequests?.nodes;

  if (!pullRequests || pullRequests.length === 0) {
    // If no pull requests, assume zero code introduced via PRs.
    return 0.0;
  }

  let totalAdditions = 0;
  let reviewedAdditions = 0;

  for (const pr of pullRequests) {
    totalAdditions += pr.additions;
    if (pr.reviews.totalCount > 0) {
      reviewedAdditions += pr.additions;
    }
  }

  if (totalAdditions === 0) {
    return 0.0;
  }

  return reviewedAdditions / totalAdditions;
}
