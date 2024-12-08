/**
 * Jorge Puga Hernandez
 *
 * The sole purpose of this file is to help configure the environment
 * for the log file. If these lines are called in index.ts, you must make sure that
 * they are in the appropriate location. Otherwise, the environment variables will not
 * be loaded and the log file will use the default values (which will make it silent).
 *
 */
import * as dotenv from 'dotenv';
dotenv.config();
