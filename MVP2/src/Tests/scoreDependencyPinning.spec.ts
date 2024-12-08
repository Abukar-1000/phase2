/**
 * Test suite for the scoreDependencyPinning function.
 * @author
 */

import { describe, expect, it } from '@jest/globals';
import { scoreDependencyPinning } from '../Scoring/scoreDependencyPinning';
import { Repository } from '../Types/DataTypes';

// Mock data for repositories
const createRepositoryMock = (packageJsonText: string | null) => {
  return {
    owner: 'testOwner',
    repoName: 'testRepo',
    fileUrl: 'https://github.com/testOwner/testRepo',
    queryResult: {
      packageJson: packageJsonText ? { text: packageJsonText } : undefined,
    },
    NDJSONRow: {},
  } as Repository<any>;
};

describe('scoreDependencyPinning', () => {
  it('should return 1.0 when package.json is not found', () => {
    const repo = createRepositoryMock(null);
    const score = scoreDependencyPinning(repo);
    expect(score).toBe(1.0);
  });

  it('should return 1.0 when there are zero dependencies', () => {
    const packageJsonText = JSON.stringify({
      dependencies: {},
      devDependencies: {},
    });
    const repo = createRepositoryMock(packageJsonText);
    const score = scoreDependencyPinning(repo);
    expect(score).toBe(1.0);
  });

  it('should return 1.0 when all dependencies are pinned to major.minor', () => {
    const packageJsonText = JSON.stringify({
      dependencies: {
        'dep1': '1.2.3',
        'dep2': '2.3.4',
      },
      devDependencies: {
        'devDep1': '3.4.5',
      },
    });
    const repo = createRepositoryMock(packageJsonText);
    const score = scoreDependencyPinning(repo);
    expect(score).toBe(1.0);
  });

  it('should return correct fraction when some dependencies are pinned', () => {
    const packageJsonText = JSON.stringify({
      dependencies: {
        'dep1': '1.2.3',
        'dep2': '^2.3.4', // Not pinned
        'dep3': '~3.4.5', // Not pinned
      },
      devDependencies: {
        'devDep1': '4.5.6',
        'devDep2': '>5.6.7', // Not pinned
      },
    });
    const repo = createRepositoryMock(packageJsonText);
    const score = scoreDependencyPinning(repo);
    // Total dependencies: 5
    // Pinned dependencies: 2 ('dep1', 'devDep1')
    expect(score).toBe(2 / 5);
  });

  it('should return 0.0 when no dependencies are pinned', () => {
    const packageJsonText = JSON.stringify({
      dependencies: {
        'dep1': '^1.2.3',
        'dep2': '~2.3.4',
      },
      devDependencies: {
        'devDep1': '>3.4.5',
      },
    });
    const repo = createRepositoryMock(packageJsonText);
    const score = scoreDependencyPinning(repo);
    expect(score).toBe(0.0);
  });

  it('should handle invalid package.json gracefully', () => {
    const invalidPackageJsonText = "{ invalid json }";
    const repo = createRepositoryMock(invalidPackageJsonText);
    const score = scoreDependencyPinning(repo);
    // Should return 1.0 when package.json cannot be parsed
    expect(score).toBe(1.0);
  });
});
