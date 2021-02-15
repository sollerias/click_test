
/**
 * File: logger.js
 * -----------------
 * Логирование данных.
 */
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

const { LOG, CORE } = require ('../settings/folderPath');

const dir = `${CORE}/log`;

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}


const opts = {
  logDirectory: path.join(`${LOG}`),
  fileNamePattern: 'dynamic-<date>.log',
  dateFormat: 'DD.MM.YYYY',
  // domain: `MyApplication-${port}`,
  level: 'trace',
  // loggerConfigFile: `${__dirname}/logger-config.json`,
  refresh: 60 * 1000, // read/refresh each 60 seconds
};

const log = require('simple-node-logger').createRollingFileLogger(opts);

/**
 * loggerFunction() - создает сущность логгера
 * @param {string} logName - название лога
 * @param {string} filePath - путь до файла, где произошло логирование
 * @param {multiple} logData - данные для логирования
 * @param {string} logLevel - уровень логирования. Один из шести:
 * trace, debug, info, warn, error, fatal
 */
const loggerFunction = (logName, filePath, logData, logLevel) => {
  try {
    log.setLevel('trace');

    let logDataResult = null;

    if (logData.hasOwnProperty('catchError')) {
      logDataResult = logData;
    } else if (typeof logData === 'object') {
      logDataResult = JSON.stringify(logData);
    } else {
      logDataResult = logData;
    }

    const logText = `| ${logName} | Path to file: ${filePath} | Log data: ${logDataResult} | Acepted at ${moment().tz('Europe/Kaliningrad').format()}`;

    switch (logLevel) {
      case 'trace':
        log.trace(logText);
        break;
      case 'debug':
        log.debug(logText);
        break;
      case 'info':
        log.info(logText);
        break;
      case 'warn':
        log.warn(logText);
        break;
      case 'error':
        log.error(logText);
        break;
      case 'fatal':
        log.fatal(logText);
        break;
      default:
        log.error('unknown logLevel');
        break;
    }
  } catch (e) {
    console.error('services/logger/error: \n', e);
  }
};

module.exports = loggerFunction;
