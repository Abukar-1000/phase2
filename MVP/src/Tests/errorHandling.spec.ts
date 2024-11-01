/**
 * Please read the describe and it statements for information on what each suite, test does.
 * This module has tests for Error wrapper
 * @author DSinc
 */
import { ErrorWrapper, ErrorWrapperForReturns, ErrorWrapperForAsync } from '../Utils/errorHandling';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Tests for Void Function Error Wrapper
describe('ErrorWrapper Tests', () => {
    let exitSpy: any;
    beforeEach(() => {
        jest.resetAllMocks();
        exitSpy = jest
            .spyOn(process, 'exit')
            .mockImplementation((code?: string | number | null | undefined) => undefined as never);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('ErrorWrapper should log an error when an error is thrown', () => {
        const mockFunction = jest.fn(() => {
            throw new Error('Test error for ErrorWrapper');
        });

        try {
            ErrorWrapper(mockFunction, 'Testing ErrorWrapper without returns');
        } catch (err) {}

        expect(exitSpy).toBeCalledWith(1);
    });

    it('We must also test the else clause in the catch block', () => {
        const mockFunction = jest.fn(() => {
            throw 'ErrorWrapper: Not Instance of Error';
        });
        try {
            ErrorWrapper(mockFunction, 'Testing ErrorWrapper Else Catch Block');
        } catch (err) {}

        expect(exitSpy).toBeCalledWith(1);
    });
});

// Tests for Error Wrapper with Returns
describe('ErrorWrapperForReturns Tests', () => {
    let exitSpy: any;
    beforeEach(() => {
        jest.resetAllMocks();
        exitSpy = jest
            .spyOn(process, 'exit')
            .mockImplementation((code?: string | number | null | undefined) => undefined as never);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('ErrorWrapperForReturns should log an error when an error is thrown', () => {
        const mockFunction = jest.fn(() => {
            throw new Error('Test error for ErrorWrapperForReturns');
        });

        try {
            ErrorWrapperForReturns(mockFunction, 'Testing ErrorWrapperForReturns');
        } catch (err) {}

        expect(exitSpy).toBeCalledWith(1);
    });

    it('ErrorWrapperForReturns should return a valid result when no error is thrown', () => {
        const mockFunction = jest.fn((a: number, b: number) => a * b);
        const result = ErrorWrapperForReturns(mockFunction, 'No Error Should Occur', 2, 5);

        expect(result).toBe(10);
        expect(exitSpy).not.toBeCalled();
    });

    it('We must also test the else clause in the catch block', () => {
        const mockFunction = jest.fn(() => {
            throw 'ErrorWrapperForReturns: Not Instance of Error';
        });
        try {
            ErrorWrapperForReturns(mockFunction, 'Testing ErrorWrapperForReturns Else Catch Block');
        } catch (err) {}

        expect(exitSpy).toBeCalledWith(1);
    });
});

// Tests for Async Error Wrapper
describe('ErrorWrapperForAsync Tests', () => {
    let exitSpy: any;
    beforeEach(() => {
        jest.resetAllMocks();
        exitSpy = jest
            .spyOn(process, 'exit')
            .mockImplementation((code?: string | number | null | undefined) => undefined as never);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('ErrorWrapperForAsync should log an error when an error is thrown', async () => {
        const mockFunction = jest.fn(async () => {
            throw new Error('Test error for ErrorWrapperForAsync');
        });

        try {
            await ErrorWrapperForAsync(mockFunction, 'Testing ErrorWrapperForAsync');
        } catch (err) {}

        expect(exitSpy).toBeCalledWith(1);
    });

    it('ErrorWrapperForAsync should return a valid result when no error is thrown', async () => {
        const mockFunction = jest.fn(async (a: number, b: number) => a * b);
        const result = await ErrorWrapperForAsync(mockFunction, 'No Error Should Occur', 5, 5);

        expect(result).toBe(25);
        expect(exitSpy).not.toBeCalled();
    });

    it('We must also test the else clause in the catch block', async () => {
        const mockFunction = jest.fn(async () => {
            throw 'ErrorWrapperForAsync: Not Instance of Error';
        });
        try {
            await ErrorWrapperForAsync(mockFunction, 'Testing ErrorWrapperForAsync Else Catch Block');
        } catch (err) {}

        expect(exitSpy).toBeCalledWith(1);
    });
});
