/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const app = require('./app');
const http = require('http');
const LOGGER = require('./lib/logger');
const server = http.createServer(app);
let clusterCount = require('os').cpus().length;
const port = normalizePort(process.env.PORT || __CONFIG.server.port || 9090);
app.set('port', port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            LOGGER.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            LOGGER.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function createWork(cluster) {
    LOGGER.info('...::: Message API :::...');
    LOGGER.info('Execute mode: [' + process.env.NODE_ENV + ']');
    
    if (!!Number(__CONFIG.numberClusters)
        && Number(__CONFIG.numberClusters) <= clusterCount) {
        clusterCount = Number(__CONFIG.numberClusters);
    }

    if (clusterCount > 1) {
        LOGGER.debug(`In cluster with: ${clusterCount}`);

        for (let i = 0; i < clusterCount; i += 1) {
            cluster.fork();
        }

        cluster.on('online', worker => LOGGER.info(`Worker ${worker.process.pid} is online`));
        cluster.on('exit', worker => {
            LOGGER.info(`Worker ${worker.id} died :(`);
            cluster.fork();
        });
    }
}

function fork() {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', () => LOGGER.info('Servidor iniciado na porta ' + app.get('port')));
}

module.exports = { createWork, fork };