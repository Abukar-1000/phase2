/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for transformation of NDJSONRows
 * @author DSinc
 */
import { describe, expect, it } from '@jest/globals';
import { mockUrls } from '../TestUtils/constants';
import { transformToNDJSONRow, transformToNDJSONRows } from '../Transform/NDJSON';

/**
 * John Leidy
 * this block tests the NDJSON Transformer. The it statements will explain what each test does.
 */
describe('NDJSON Transformer', () => {
    mockUrls.forEach((url) => {
        it(`should build a row with the url ${url}`, () => {
            const row = transformToNDJSONRow(url);
            expect(row.URL).toBe(url);
        });
    });

    it('Should build rows with urls', () => {
        const rows = transformToNDJSONRows(mockUrls);
        rows.forEach((row) => {
            expect(mockUrls.includes(row.URL ? row.URL : '')).toBe(true);
        });
    });
});
