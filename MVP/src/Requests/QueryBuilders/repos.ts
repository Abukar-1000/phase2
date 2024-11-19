/**
 * Please see the individual function documentation for information.
 * This module builds a dynamic query for GQL
 * @author DSinc
 */

import { QueryParams, Repository } from '../../Types/DataTypes';
import { defaultFields } from './constants';


/**
 * @author John Leidy
 * @description Builds a GraphQL query string based on the provided repository query information and optional extra fields.
 * @param repoQueryInformation An array of objects containing the owner and repository name for each query. {@type Repository<T>[]}
 * @param extraFields An optional array of additional fields to include in the query. {@type string[]}
 * @returns The constructed GraphQL query string. {@type string}
 */
export const repoQueryBuilder = <T>(repos: Repository<T>[], extraFields?: string[]): string => {
    return `
        query {
            ${repos
                .map((repo, idx) => {
                    return `
                repo${idx}: repository(owner: "${repo.owner}", name: "${repo.repoName}") {
                                ${[...defaultFields, ...(extraFields ?? [])].join('\n')}
                                  
                            }
                        `;
                })
                .join('\n')}
        }
    `;
};

/**
 * @author John Leidy
 * @description Builds a query that shows the fields available for repositories
 * @returns a string to use for a query! {@type string}
 */
export const buildRepoSchemaQuery = (): string => {
    return `
       query {
        __type(name: "Repository") {
                name
                kind
                description
                fields {
                    name
                }
            }
        }

    `;
};
