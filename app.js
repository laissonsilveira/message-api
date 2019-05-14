/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const express = require('express');
const bodyParser = require('body-parser');
const Errors = require('./lib/errors');
const LOGGER = require('./lib/logger.js');

const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    next();
});

// Bundle routes
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);
LOGGER.info('Rotas configuradas');

// Config Errors
app.use(Errors.logErrors);
app.use(Errors.clientErrorHandler);

module.exports = app;
