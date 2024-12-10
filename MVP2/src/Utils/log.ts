/**
 * Please see the individual doc comments for more information.
 * This module handles logging for our application!
 * @author DSinc
 */
import './envConfig';
import * as fs from 'fs';

const now = Date.now();
const date = new Date(now);

// Obtain the environment variables. If they are not set, use the default values
// below. The verbosity level will be 0 by default as per instructions.
const LOG_LEVEL = process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL, 10) : 0;
const LOG_FILE = process.env.LOG_FILE || `./Logs/${date.toISOString()}-temporary.log`;

// Extra level for our own testing purposes.
const SECRET_LEVEL = process.env.SECRET_LEVEL || undefined;

/**
 * @author Jorge Puga Hernandez
 * @description
 * - This function will check if the log file exists by using its path.
 * If it does not exist, then an empty log file will be created.
 *
 */
function CreateLogFile() {
    if (!fs.existsSync(LOG_FILE)) {
        if (!fs.existsSync('./Logs')) {
            fs.mkdirSync('./Logs');
        }
        fs.writeFileSync(LOG_FILE, '', { flag: 'w' });
    }
}

/**
 * @author John Leidy
 * @description Function to reset the log level each run. Without having exit code 1 for no log file we could do a datetime for each.
 */
const RemoveIfExists = () => {
    if (fs.existsSync(LOG_FILE)) {
        if (fs.existsSync('./Logs')) {
            fs.rmSync(LOG_FILE);
        }
    }
};

/**
 * @author Jorge Puga Hernandez
 * @description
 * - This function will log messages to the log file with the locale time
 * format. If the log file does not exist, then it will be created
 * by calling the CreateLogFile function.
 * - If the verbosity level is >=1, then informational messages will be logged
 *
 * @param message - The message to log. {@type string}
 *
 */
export function LogInfo(message: string) {
    if (LOG_LEVEL >= 1) {
        CreateLogFile();
        const logEntry = `${new Date().toLocaleString()} - ${message}\n`;
        fs.appendFileSync(LOG_FILE, logEntry);

        if (SECRET_LEVEL) {
            console.log(logEntry);
        }
    }
}

/**
 * @author John Leidy
 * @description Rubric asks for an empty log file if log level is 0
 */
export const ClearLogFile = () => {
    RemoveIfExists();
    CreateLogFile();
};

/**
 * @author Jorge Puga Hernandez
 * @description
 * - This function will log messages to the log file with the locale time
 * format. If the log file does not exist, then it will be created
 * by calling the CreateLogFile function.
 * - If the verbosity level is >=2, then debug messages will be logged.
 *
 * @param message - The message to log. {@type string}
 *
 */
export function LogDebug(message: string) {
    if (LOG_LEVEL >= 2) {
        CreateLogFile();
        const logEntry = `${new Date().toLocaleString()} - ${message}\n`;
        fs.appendFileSync(LOG_FILE, logEntry);

        if (SECRET_LEVEL) {
            console.log(logEntry);
        }
    }
}
