/**
 * Please see the individual function documentation for information.
 * This module processes handles the request to GQL
 * @author DSinc
 */

import chalk from 'chalk';
import { GraphQLResponse } from '../../Types/ResponseTypes';
import { LogDebug, LogInfo } from '../../Utils/log';

/**
 * @author John Leidy
 * @description This function is responsible for sending our query string to the GitHub GQL API.
 * @param query The query string built from our query builder {@type string}
 * @returns a promise {@type Promise<GraphQLResponse<T> | undefined>}
 */
export const requestFromGQL = async <T>(query: string): Promise<GraphQLResponse<T> | undefined> => {
    if (!process.env.GITHUB_TOKEN) {
        throw new Error('TOKEN NOT SET');
    }
    const endpoint = 'https://api.github.com/graphql';
    const token = process.env.GITHUB_TOKEN;

    try {
        LogInfo(`Fetching from GQL`);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });
        const result: GraphQLResponse<T> = await response.json();
        LogInfo(`Fetching from GQL completed. `);
        if (result.message || (result.status && !result.data)) {
            LogInfo(`Message from GQL: ${result.message}`);
            LogInfo(`Status from GQL: ${result.status}`);
            throw new Error(
                `GQL Response returned a message: ${result.message} with a code: ${result.status}. ${
                    result.message?.includes('credentials') || result.status === '401' ? 'INVALID TOKEN' : ''
                }`
            );
        }
        return result;
    } catch (err) {
        LogDebug(
            err instanceof Error
                ? `ERR IN GQL ${chalk.red(err.message)}`
                : 'An unknown error occured in requestFromGQL'
        );
        throw new Error(
            err instanceof Error
                ? `ERR IN GQL ${chalk.red(err.message)}`
                : 'An unknown error occured in requestFromGQL'
        );
    }
};
