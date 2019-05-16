/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const LOGGER = require('../lib/logger');

class Errors {

    static logErrors(err, req, res, next) {
        LOGGER.error(err.message, err.stack);
        next(err);
    }

    //eslint-disable-next-line
    static clientErrorHandler(err, req, res, next) {
        let response = { message: 'Erro interno no servidor. Contate o administrador.' };
        if (err.isKnown) {
            response = { message: err.message };
        } else if (err.message.includes('E11000 duplicate key error collection: message-api.users')) {
            response = { message: 'Já existe um usuário com este nome.' };
        }
        res.status(500).send(response);
    }

}

module.exports = Errors;
