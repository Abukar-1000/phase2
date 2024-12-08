/**
 * This module contains transformers for urls to rows
 * @author DSinc
 */
import { NDJSONRow, NDJSONRows } from '../Types/DataTypes';

/**
 * @author John Leidy
 * @description Transforms a url into an NDJSONRow obj
 * @param url a url for a repo {@type string}
 * @returns an NDJSONRow {@type NDJSONRow}
 */
export const transformToNDJSONRow = (url: string): NDJSONRow => ({
    URL: url,
    NetScore: 0,
    NetScore_Latency: 0,
    RampUp: 0,
    RampUp_Latency: 0,
    Correctness: 0,
    Correctness_Latency: 0,
    BusFactor: 0,
    BusFactor_Latency: 0,
    ResponsiveMaintainer: 0,
    ResponsiveMaintainer_Latency: 0,
    License: 0,
    License_Latency: 0,
});

/**
 * @author John Leidy
 * @description A function to create NDJSONRows from an arr of urls
 * @param urls an arr of urls {@type string[]}
 * @returns an array of NDJSONRows {@type NDJSONRows}
 */
export const transformToNDJSONRows = (urls: string[]): NDJSONRows =>
    urls.map((url) => transformToNDJSONRow(url));
