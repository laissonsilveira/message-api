/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const LOGGER = require('./logger');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set('useCreateIndex', true);
const { NODE_ENV, BD_USER, BD_PWD, BD_IP, BD_PORT } = process.env;

function serializer(data) {
    let query = JSON.stringify(data.query);
    let doc = JSON.stringify(data.doc || {});
    return `[DATABASE] '${data.coll}.${data.method}(${query}, ${doc})'`;
}

function _getUri() {
    let uri = 'mongodb://';
    if (NODE_ENV !== 'test') uri += (BD_USER || __CONFIG.database.user) + ':' + (BD_PWD || __CONFIG.database.pass) + '@';
    uri += (BD_IP || __CONFIG.database.host) + ':' + (BD_PORT || __CONFIG.database.port) + '/';
    uri += __CONFIG.database.dbName;
    if (NODE_ENV !== 'test') uri += '?authSource=' + __CONFIG.database.authdb;
    return uri;
}

const connectDB = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.on('connected', () => {
            LOGGER.info(`[DATABASE] conectado ao banco de dados: '${BD_IP || __CONFIG.database.host}:${__CONFIG.database.port}/${__CONFIG.database.dbName}'`);
            resolve();
        });

        mongoose.connection.on('error', err => {
            LOGGER.error(`[DATABASE] erro na conexão: ${err}`);
            reject();
        });

        mongoose.connection.on('disconnected', () => {
            LOGGER.info('[DATABASE] banco de dados desconectado');
        });

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                LOGGER.info('[DATABASE] conexão com banco de dados foi perdida pois a aplicação foi finalizada');
                process.exit(0);
            });
        });

        mongoose.set('debug', (coll, method, query, doc) => {
            if (__CONFIG.database.isDebug) {
                LOGGER.debug(serializer({ coll, method, query, doc }));
            }
        });

        (async () => {
            const UsersModel = require('../models/users-model');
            require('../models/messages-model');

            await mongoose.connect(_getUri(), {
                useNewUrlParser: true,
                autoReconnect: true,
                reconnectTries: 1000000,
                reconnectInterval: 3000
            });

            const user = await UsersModel.find({ username: 'admin' });
            if (user.length === 0) await UsersModel.create({ name: 'Administrador', username: 'admin', password: 'adminpwd' });
        })();
    });
};

module.exports = { connect: connectDB };