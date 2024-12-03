/**
 * Test suite for the scoreCodeReview function.
 */

import { describe, expect, it } from '@jest/globals';
import { scoreCodeReview } from '../Scoring/scoreCodeReview';
import { Repository } from '../Types/DataTypes';

// Mock data for repositories
const createRepositoryMock = (pullRequests: any) => {
  return {
    owner: 'testOwner',
    repoName: 'testRepo',
    fileUrl: 'https://github.com/testOwner/testRepo',
    queryResult: {
      pullRequests: pullRequests,
    },
    NDJSONRow: {},
  } as Repository<any>;
};

describe('scoreCodeReview', () => {
  it('should return 0.0 when there are no pull requests', () => {
    const repo = createRepositoryMock(undefined);
    const score = scoreCodeReview(repo);
    expect(score).toBe(0.0);
  });

  it('should return 0.0 when no pull requests have reviews', () => {
    const pullRequests = {
      nodes: [
        { additions: 100, reviews: { totalCount: 0 } },
        { additions: 200, reviews: { totalCount: 0 } },
      ],
    };
    const repo = createRepositoryMock(pullRequests);
    const score = scoreCodeReview(repo);
    expect(score).toBe(0.0);
  });

  it('should return 1.0 when all pull requests have reviews', () => {
    const pullRequests = {
      nodes: [
        { additions: 100, reviews: { totalCount: 1 } },
        { additions: 200, reviews: { totalCount: 2 } },
      ],
    };
    const repo = createRepositoryMock(pullRequests);
    const score = scoreCodeReview(repo);
    expect(score).toBe(1.0);
  });

  it('should return correct fraction when some pull requests have reviews', () => {
    const pullRequests = {
      nodes: [
        { additions: 100, reviews: { totalCount: 1 } }, // Reviewed
        { additions: 200, reviews: { totalCount: 0 } }, // Not reviewed
        { additions: 300, reviews: { totalCount: 2 } }, // Reviewed
      ],
    };
    const repo = createRepositoryMock(pullRequests);
    const score = scoreCodeReview(repo);
    // Total additions: 600
    // Reviewed additions: 100 + 300 = 400
    expect(score).toBe(400 / 600);
  });

  it('should return 0.0 when total additions are zero', () => {
    const pullRequests = {
      nodes: [
        { additions: 0, reviews: { totalCount: 1 } },
        { additions: 0, reviews: { totalCount: 0 } },
      ],
    };
    const repo = createRepositoryMock(pullRequests);
    const score = scoreCodeReview(repo);
    expect(score).toBe(0.0);
  });
});
