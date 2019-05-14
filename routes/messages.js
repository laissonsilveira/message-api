/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 *
 * API - /actions
 */
const express = require('express');
const router = express.Router();
const LOGGER = require('../lib/logger');
const MessagesCtrl = require('../controllers/MessagesCtrl');
const UsersCtrl = require('../controllers/UsersCtrl');

/**
 * @api {get} https://localhost/message-api/actions Lista Fontes
 * @apiDescription Lista as fontes cadastradas
 * @apiName GetActions
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.1
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost/message-api/actions' \
 *      -H 'Authorization: Bearer skdlkjlkje....'
 *
 * @apiSuccess {String} _id Identificador único da fonte
 * @apiSuccess {String} name Nome da fonte
 * @apiSuccess {String} version Versão da fonte
 * @apiSuccess {String} versionDate Data da versão da fonte
 *
 * @apiSuccessExample {json} Success-Response
 * [
 *    {
 *        "_id": "5c0c18f30ed9c94a52d0657c",
 *        "name": "bradesco",
 *        "version": "1.0.4",
 *        "versionDate": "2018-12-08T19:18:11.740Z"
 *    },
 *    {
 *        "_id": "5c11bdb20ed9c94a52d09fce",
 *        "name": "facebook",
 *        "version": "1.0.8",
 *        "versionDate": "2018-12-13T02:02:26.259Z"
 *    }
 * ]
 */
router.get('/', async (req, res, next) => {
    try {
        const userID = req.query.to;
        const messages = await MessagesCtrl.findByUser(userID);
        if(Array.isArray(messages)) {
            for (const msg of messages) {
                msg.id = msg._id.toString();
                delete msg._id;
            }
        }
        res.json(messages);
    } catch (err) {
        next(err);
    }
});

/**
 * @api {post} https://localhost/message-api/actions Download Fontes
 * @apiDescription Efetua o download das fontes as serem atualizadas no cliente
 * @apiName PostAction
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.1
 *
 * @apiExample {curl} Example usage:
 *  curl -X POST \
 *    'https://localhost/api/actions' \
 *    -H 'Content-Type: application/json' \
 *    -d '{
 *            "actions": ["amil"]
 *        }'
 *
 * @apiParam {String[]} actions Lista de nome das fontes a serem atualizadas
 * @apiParamExample {json} Request-Example
 * {
 *     "actions": ["amil"]
 * }
 *
 * @apiSuccessExample {buffer} Success-Response
 * HTTP/1.1 200 OK
 * Buffer[]
 */
router.post('/', async (req, res, next) => {
    const message = req.body;
    LOGGER.info('[API-MESSAGES] Salvando uma nova mensagem');
    try {
        await MessagesCtrl.validate(message);
        await MessagesCtrl.save(message);
        await UsersCtrl.updateBudget(message.to);
        LOGGER.info(`[API-MESSAGES] Mensagem de '${message.from}' para '${message.to}' enviada com sucesso!`);
        res.end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
