import { LogDebug, LogInfo } from './log';

/**
 * @author Jorge Puga Hernandez
 * @description
 * - Wraps a void function in a try-catch block, handling
 *   any errors that occur during its execution. If an error
 *   is caught, it logs the error message and exits with return code 1.
 *
 * @param func - The function to execute, which should not have any return values. {@type () => void}
 * @param message - The error message that is displayd if an error occurs. {@type string}
 *
 */
export const ErrorWrapper = (func: () => void, message: string) => {
    try {
        func();
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message, message);
            LogInfo(`${message}: ${err.message}`);
        } else {
            console.log(message);
            LogInfo(message);
        }
        process.exit(1);
    }
};

/**
 * @author Jorge Puga Hernandez
 * @description
 * - Wraps a function that returns a value in a try-catch block,
 *   handling any errors that occur during its execution. This
 *   function can accept multiple parameters.
 * - If an error is caught, it logs the error message and exits with return code 1.
 *
 * @template T - The return type of the function being wrapped (generic).
 * @param func - The function to execute which returns T. {@type (...args: any[]) => T}
 * @param message - The error message to display if an error occurs. {@type string}
 * @param args - The arguments to pass to the function. {@type ...any[]}
 * @returns The result of the function if no error occurs. {@type T}
 *
 */
export const ErrorWrapperForReturns = <T>(func: (...args: any[]) => T, message: string, ...args: any[]) => {
    try {
        return func(...args);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message, message);
            LogInfo(`${message}: ${err.message}`);
        } else {
            console.log(message);
            LogInfo(message);
        }
        process.exit(1);
    }
};

/**
 * @author Jorge Puga Hernandez
 * @description
 * - Wraps an async function in a try-catch block,
 *   handling any errors that occur during its execution. This
 *   function can accept multiple parameters.
 * - If an error is caught, it logs the error message and exits with return code 1.
 *
 * @template T - The return type of the function being wrapped (generic).
 * @param func - The async function to execute which returns a promise. {@type (...args: any[]) => Promise<T>}
 * @param message - The error message to display if an error occurs. {@type string}
 * @param args - The arguments to pass to the function. {@type ...any[]}
 * @returns The result of the function if no error occurs (promise). {@type T}
 *
 */
export const ErrorWrapperForAsync = async <T>(
    func: (...args: any[]) => Promise<T>,
    message: string,
    ...args: any[]
): Promise<T | void> => {
    try {
        return await func(...args);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message, message);
            LogInfo(`${message}: ${err.message}`);
        } else {
            console.log(message);
            LogInfo(message);
        }
        process.exit(1);
    }
};
