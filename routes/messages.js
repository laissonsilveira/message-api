/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 *
 * API - /messages
 */
const express = require('express');
const router = express.Router();
const LOGGER = require('../lib/logger');
const MessagesCtrl = require('../controllers/MessagesCtrl');
const UsersCtrl = require('../controllers/UsersCtrl');

/**
 * @api {get} http://localhost:9090/api/messages Busca mensagens enviada
 * @apiDescription Busca mensagens enviadas de um usuário
 * @apiName GetMessages
 * @apiGroup message-api
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost/api/messages?to=5cdb72aa488149c3f5850d1a' \
 *      -H 'Authorization: Bearer skdlkjlkje....'
 *
 * @apiParam {String} to Identificador do usuário que recebeu a mensagem
 *
 * @apiSuccess {Object[]} messages Mensagens encontradas
 * @apiSuccess {String} messages.id Identificador único do usuário
 * @apiSuccess {String} messages.body Conteúdo da mensagem enviada
 * @apiSuccess {String} messages.from Identificador do usuário que enviou a mensagem
 * @apiSuccess {String} messages.to Identificador do usuário que recebeu a mensagem
 * @apiSuccess {String} messages.sentAt Data de envio da mensagem
 *
 * @apiSuccessExample {json} Success-Response
 * {
 *   "messages": [
 *       {
 *           "body": "lalalalalal",
 *           "from": "5cdb72aa488149c3f5850d1a",
 *           "to": "5cdb970851d208db53d0f481",
 *           "sentAt": "2019-05-15T04:37:11.751Z",
 *           "id": "5cdb977751d208db53d0f483"
 *       }
 *   ]
 * }
 *
 * @apiError (Error) {String} message Mensagem do erro
 *
 * @apiErrorExample {json} Caracteres excedidos
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": "Quantidade máxima de caracteres permitido excedido. [Máx. 280 caracteres]"
 * }
 *
 * @apiErrorExample {json} Saldo insuficiente
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": "Quantidade máxima de caracteres permitido excedido. [Máx. 280 caracteres]"
 * }
 */
router.get('/', async (req, res, next) => {
    try {
        const userID = req.query.to;
        const messages = await MessagesCtrl.findByUser(userID);
        if (Array.isArray(messages)) {
            for (const msg of messages) {
                msg.id = msg._id.toString();
                delete msg._id;
            }
        }
        res.json({ messages });
    } catch (err) {
        next(err);
    }
});

/**
 * @api {post} http://localhost:9090/api/messages Salva mensagem
 * @apiDescription Salva mensagem enviada para o usuário
 * @apiName PostMessages
 * @apiGroup message-api
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X POST \
 *    'http://localhost:9090/api/messages' \
 *    -H 'Content-Type: application/json' \
 *    -d '{
 *       	"body": "lalalalalal",
 *       	"from": "5cdb72aa488149c3f5850d1a",
 *       	"to": "5cdb975a51d208db53d0f482"
 *       }'
 *
 * @apiSuccessExample {buffer} Success-Response
 * HTTP/1.1 200 OK
 */
router.post('/', async (req, res, next) => {
    const message = req.body;
    LOGGER.info('[API-MESSAGES] Salvando uma nova mensagem');
    try {
        await MessagesCtrl.validate(message);
        await MessagesCtrl.save(message);
        await UsersCtrl.updateBudget(message.from);
        LOGGER.info(`[API-MESSAGES] Mensagem de '${message.from}' para '${message.to}' enviada com sucesso!`);
        res.end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
