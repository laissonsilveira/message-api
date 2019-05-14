/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');
const { dateFormat } = require('./utils');

process.env.NODE_ENV !== 'test'
    && !existsSync(__CONFIG.log.directory)
    && mkdirSync(__CONFIG.log.directory);

winston.emitErrs = true;
const config = {
    transports: [
        new winston.transports.Console({
            level: __CONFIG.log.console.level,
            handleExceptions: true,
            json: __CONFIG.log.console.json,
            colorize: __CONFIG.log.console.colorize,
            timestamp: dateFormat,
            debugStdout: true
        })
    ],
    exitOnError: false
};

process.env.NODE_ENV !== 'test'
    && config.transports.push(
        new winston.transports.DailyRotateFile({
            filename: join(__CONFIG.log.directory, 'message-api.log'),
            prepend: true,
            level: __CONFIG.log.file.level,
            handleExceptions: true,
            json: __CONFIG.log.file.json,
            prettyPrint: __CONFIG.log.file.prettyPrint,
            maxsize: __CONFIG.log.file.maxsize,
            maxFiles: __CONFIG.log.file.maxFiles,
            colorize: __CONFIG.log.file.colorize,
            timestamp: dateFormat
        })
    );

const logger = new winston.Logger(config);
module.exports = logger;
module.exports.stream = {
    write: function (message) {
        logger.info(message);
    }
};