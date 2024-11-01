/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for utils
 * @author DSinc
 */
import { describe, expect, it } from '@jest/globals';
import { pluralizeText } from '../Utils/utils';

interface TestData<T> {
    [key: string]: { arr: T[]; text: string; expected: string };
}

/**
 * John Leidy
 * test data for utils tests
 */
const testData: TestData<number> = {
    'plural text when array has multiple items': {
        arr: [1, 2, 3],
        text: 'text',
        expected: 'texts',
    },
    'un-pluralized text when array has one item': {
        arr: [1],
        text: 'text',
        expected: 'text',
    },
    'un-pluralized text when array has no items': {
        arr: [],
        text: 'text',
        expected: 'text',
    },
};

/**
 * John Leidy
 * This block tests the utils file. The it statement will explain what the test does.
 */
describe('Utils', () => {
    Object.entries(testData).map(([key, value]) => {
        it(`Pluralize text should create ${key}`, () => {
            expect(pluralizeText(value.arr, value.text)).toBe(value.expected);
        });
    });
});
