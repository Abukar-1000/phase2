/**
 * This module only contains types for our urls used in sanitizer and input
 * @author DSinc
 */
// ==================== Types Tightly Couples With CleanURLSet ====================
export interface TokenizedURL {
    raw: string;
    tokens: string[];
    protocol: string | undefined;
}

export interface Repo_TokenizedURL extends TokenizedURL {
    repoOwner: string;
    repoName: string;
}

export interface Package_TokenizedURL extends TokenizedURL {
    packageName: string;
}

export type RepoURL = Repo_TokenizedURL | undefined;
export type PackageURL = Package_TokenizedURL | undefined;
