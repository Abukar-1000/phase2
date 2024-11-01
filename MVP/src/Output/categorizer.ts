/**
 * Please see the individual function documentation for information.
 * This module categorizes modules
 * @author DSinc
 */
import { Repository } from '../Types/DataTypes';

/**
 * @author Jorge Puga Hernandez
 * @description
 * - This function ranks/categorizes the modules based on their NetScore values.
 * - Repositories that had a NetScore greater than 0.6 are marked compatible.
 * - Repositories that had a NetScore less than or equal to 0.6 are marked incompatible.
 * - The repositories are then sorted to appear in descending order of their NetScore values
 * when printed.
 *
 * @template T - The type of data stored in each repository.
 * @param repos - An array of repositories to categorize. {@type Repository<T>[]}
 *
 */
export const CategorizeModules = <T>(repos: Repository<T>[]) => {
    let compatibleModules: Repository<T>[] = [];
    let incompatibleModules: Repository<T>[] = [];

    repos.forEach((repo) => {
        if (repo.NDJSONRow.NetScore != undefined && repo.NDJSONRow.NetScore > 0.6) {
            compatibleModules.push(repo);
        } else {
            incompatibleModules.push(repo);
        }
    });

    // Sort and then print.
    compatibleModules.sort((a, b) => (b.NDJSONRow.NetScore ?? 0) - (a.NDJSONRow.NetScore ?? 0));
    incompatibleModules.sort((a, b) => (b.NDJSONRow.NetScore ?? 0) - (a.NDJSONRow.NetScore ?? 0));

    PrintCompatibleModules(compatibleModules);
    PrintIncompatibleModules(incompatibleModules);
};

/**
 * @author Jorge Puga Hernandez
 * @description
 * - Prints the list of compatible modules in the console.
 *
 * @template T - The type of data stored in each repository.
 * @param compatibleModules - An array of compatible repos. {@type Repository<T>[]}
 */
const PrintCompatibleModules = <T>(compatibleModules: Repository<T>[]) => {
    if (compatibleModules.length === 0) {
        console.log('\nNo compatible modules found!');
    } else {
        console.log('\nCompatible modules:');
        compatibleModules.forEach((repo) => {
            console.log(JSON.stringify(repo, null, 2));
        });
    }
};

/**
 * @author Jorge Puga Hernandez
 * @description
 * - Prints the list of incompatible modules in the console.
 *
 * @template T - The type of data stored in each repository.
 * @param compatibleModules - An array of incompatible repos. {@type Repository<T>[]}
 */
const PrintIncompatibleModules = <T>(incompatibleModules: Repository<T>[]) => {
    if (incompatibleModules.length === 0) {
        console.log('\nNo incompatible modules found!');
    } else {
        console.log('\nIncompatible modules:');
        incompatibleModules.forEach((repo) => {
            console.log(JSON.stringify(repo, null, 2));
        });
    }
};
