/**
 * Please see the individual function documentation for information.
 * This module sanitizes input
 * @author DSinc
 */
import { Package_TokenizedURL, PackageURL, Repo_TokenizedURL, RepoURL } from '../Types/URLTypes';
import { ReadURLFile } from './Input';

export class CleanURLSet {
    repoCapacity: number = 5;
    packageCapacity: number = 5;
    github_URLs: RepoURL[] = [];
    npm_URLs: PackageURL[] = [];
    gitCount: number = 0;
    npmCount: number = 0;

    Copy(rhs: CleanURLSet) {
        this.repoCapacity = rhs.repoCapacity;
        this.packageCapacity = rhs.packageCapacity;
        this.github_URLs = rhs.github_URLs;
        this.npm_URLs = rhs.npm_URLs;
        this.gitCount = rhs.gitCount;
        this.npmCount = rhs.npmCount;
    }

    constructor(maxRepoCount: number, maxPackageCount: number) {
        this.repoCapacity = maxRepoCount;
        this.packageCapacity = maxPackageCount;
        this.github_URLs;
    }

    AddRepoURL(github_URL: RepoURL): boolean {
        try {
            this.github_URLs[this.gitCount] = github_URL;
            this.gitCount++;
            return true;
        } catch {
            return false;
        }
    }

    AddPackageURL(npm: PackageURL): boolean {
        try {
            this.npm_URLs[this.npmCount] = npm;
            this.npmCount++;
            return true;
        } catch {
            return false;
        }
    }

    AddRepoURL_NullFiltered(github_URL: Repo_TokenizedURL): boolean {
        return github_URL ? this.AddRepoURL(github_URL) : false;
    }

    AddPackageURL_NullFiltered(npm_URL: Package_TokenizedURL): boolean {
        return npm_URL ? this.AddPackageURL(npm_URL) : false;
    }
}

/**
 * @author Dorian Bell II
 * @description
 * - Procures a set of sanitized urls to make queries from, using a given filepath
 *   as the url source.
 *
 *
 * @param filepath - The path to the file containing the urls to be sanitized
 * @param fallbackToDefaultPath - y/n try to use the default filepath if the given path fails
 * @returns An object containing tokens from sanitized urls {@type CleanURLSet}
 *
 * @remarks
 * This function calls ReadURLFile and then SanitizeUrlSet.
 */
export function ProvideURLsForQuerying(
    filepath: string,
    fallbackToDefaultPath: boolean = false
): CleanURLSet {
    const urls = ReadURLFile(filepath, fallbackToDefaultPath);
    //removed for checker
    //console.log(urls);
    return SanitizeUrlSet(urls);
}

/**
 * @author Dorian Bell II
 * @description
 * - Returns an object containing clean and distinctly separated url tokens pertinent
 *   to the queries that will be made to the npm registry and GQL
 *
 *
 * @param rawURls - The set of urls that shall be sanitized {@type string | undefined}
 * @returns All the data that might be needed for process of querying GQL {@type CleanURLSet}
 *
 * @remarks
 * The function returns an empty CleanURLSet if an undefined string array is provided
 */
export function SanitizeUrlSet(rawUrls: string[] | undefined): CleanURLSet {
    // Immediately quite this process with an empty CleanURLSet if an invalid URL set was provided
    if (!rawUrls) {
        return new CleanURLSet(0, 0);
    }

    // Now that that's out of the way, we can sanitize each string
    let url, protocolAddressPair, protocol, webAddress, addressTokens;
    let size = rawUrls.length;
    const cleanURLs = new CleanURLSet(size, size);

    // HERE FOR UNIT TESTING - Removed for checker
    //console.log(rawUrls);

    for (var i = 0; i < size; i++) {
        try {
            url = rawUrls[i];
            if (url.length < 11) {
                continue;
            }

            // Splitting web protocol from web address
            protocolAddressPair = url.split('//');
            protocol = protocolAddressPair[0];
            webAddress = protocolAddressPair[1];
            addressTokens = webAddress.split('/');

            if (addressTokens[0] == 'github.com') {
                cleanURLs.AddRepoURL(BuildCleanURL_github(url, protocol, addressTokens));
            } else if (addressTokens[0] == 'www.npmjs.com') {
                cleanURLs.AddPackageURL(BuildCleanURL_npm(url, protocol, addressTokens));
            } else {
            }
        } catch {
            continue;
        }
    }

    return cleanURLs;
}

/**
 * @author Dorian Bell II
 * @description
 * - Returns an object containing clean and distinctly separated url tokens pertinent
 *   to the queries that will be made to the npm registry and GQL
 *
 *
 * @param raw - A single raw url to be processed {@type string}
 * @returns All the data that might be needed for process of querying GQL {@type RepoURL | undefined}
 *
 * @throws
 * An error gets thrown if anything goes wrong in the process of building the URLobj
 */
export function TryBuildRepoURL(raw: string): RepoURL | undefined {
    try {
        let protocolAddressPair, protocol, webAddress, addressTokens;
        if (raw.length < 11) {
            return undefined;
        }

        // Splitting web protocol from web address
        protocolAddressPair = raw.split('//');
        protocol = protocolAddressPair[0];
        webAddress = protocolAddressPair[1];
        addressTokens = webAddress.split('/');

        if (addressTokens[0] == 'github.com') {
            return BuildCleanURL_github(raw, protocol, addressTokens);
        }
        return undefined;
    } catch {
        throw new Error('The RepoURL failed to be built');
    }
}

/**
 * @author Dorian Bell II
 * @description
 * - Returns an object containing clean and distinctly separated url tokens pertinent
 *   to the queries that will be made to the npm registry and GQL
 *
 *
 * @param raw - A single raw url to be processed {@type string}
 * @returns All the data that might be needed for process of querying GQL {@type PackageURL | undefined}
 *
 * @throws
 * An error gets thrown if anything goes wrong in the process of building the URLobj
 */
export function TryBuildPackageURL(raw: string): PackageURL | undefined {
    try {
        let protocolAddressPair, protocol, webAddress, addressTokens;
        if (raw.length < 11) {
            return undefined;
        }

        // Splitting web protocol from web address
        protocolAddressPair = raw.split('//');
        protocol = protocolAddressPair[0];
        webAddress = protocolAddressPair[1];
        addressTokens = webAddress.split('/');

        if (addressTokens[0] == 'github.com') {
            return BuildCleanURL_npm(raw, protocol, addressTokens);
        }
        return undefined;
    } catch {
        throw new Error('The PackageURL failed to be built');
    }
}

/**
 * @author Dorian Bell II ; John Leidy
 * @description
 * - Processes a url from the npmjs.com web domain by verifying its domain and format,
 *  and then couples the url tokens within an object
 *
 *
 * @param rawURl - The url that shall be sanitized {@type string}
 * @param webProtocol - String representing the web protocol fron the url {@type string}
 * @param addressTokens - Tokens taken from the web address, using '\' delimiter {@type string[]}
 * @returns Tokenized url data, which can be used to Query the npm registry {@type PackageURL}
 *
 * @remarks
 * The only thing that should vary between valid npm urls is the package name part.
 * This is stored in index 2 of a given set of address tokens
 */
function BuildCleanURL_npm(rawURL: string, webProtocol: string, addressTokens: string[]): PackageURL {
    try {
        // npm url format: [web protocol]\\[npmjs.com]\package\[package name]
        const packageInfo = rawURL.match(/\/package\/(.+)/);
        const title = packageInfo ? packageInfo[1] : ' ';

        const packageUrl: PackageURL = {
            raw: rawURL,
            tokens: addressTokens,
            protocol: webProtocol,
            packageName: title,
        };
        return packageUrl;
    } catch {
        throw new Error('This build operation failed');
    }
}

/**
 * @author Dorian Bell II
 * @description
 * - Processes a url from the github.com web domain by verifying its domain and format,
 *  and then couples the url tokens within an object
 *
 *
 * @param rawURl - The url that shall be sanitized {@type string}
 * @param webProtocol - String representing the web protocol fron the url {@type string}
 * @param addressTokens - Tokens taken from the web address, using '\' delimiter {@type string[]}
 * @returns Tokenized url data needed for the process of querying GQL {@type RepoURL}
 *
 * @remarks
 * The only thing that should vary between valid npm urls is the package name part.
 * This is stored in index 2 of a given set of address tokens
 */
function BuildCleanURL_github(rawURL: string, webProtocol: string, addressTokens: string[]): RepoURL {
    try {
        const repoUrl: RepoURL = {
            raw: rawURL,
            tokens: addressTokens,
            protocol: webProtocol,
            repoOwner: addressTokens[1],
            repoName: addressTokens[2],
        };
        return repoUrl;
    } catch {
        throw new Error('This build operation failed');
    }
}
