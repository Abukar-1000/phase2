/**
 * This module only contains a few small util functions!
 * @author DSinc
 */
import { LogInfo } from './log';

export const pluralizeText = <T>(arr: T[], text: string) => `${text}${arr.length > 1 ? 's' : ''}`;

export const equalFloat = (a: number, b: number, epsilon = 0.001): boolean => {
    LogInfo(`comparing floats: ${a} ${b}... result: ${Math.abs(a - b) < epsilon}`);
    return Math.abs(a - b) < epsilon;
};
