/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 *
 * API - /users
 */
const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/UsersCtrl');
const LOGGER = require('../lib/logger');

/**
 * @api {get} https://localhost/api/users Lista Usuários
 * @apiDescription Lista os usuários
 * @apiName GetUsers
 * @apiGroup message-api
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost/api/users' \
*    -H 'Authorization: Bearer CJstk7cypEDwaFW4...' \
 *
 * @apiSuccess {String} id Identificador único do cliente
 * @apiSuccess {String} name Nome do usuário
 * @apiSuccess {Number} budget Saldo do cliente
 * @apiSuccess {Number} messageSentCount Quantidade de envio de mensagens
 * @apiSuccess {String} createdAt Data de criação do usuário
 *
 * @apiSuccessExample {json} Success-Response
 * [
 *   {
 *       "budget": 10,
 *       "messageSentCount": 0,
 *       "name": "laisson",
 *       "createdAt": "2019-05-14T23:27:36.705Z",
 *       "id": "5cdb4ee81fe76800228cfa5b"
 *   }
 * ]
 */
router.get('/', async (req, res, next) => {
    LOGGER.info('[API-USERS] Pesquisando todos usuários');
    try {
        const user = await UserCtrl.findAll();
        res.json(user);
    } catch (err) {
        next(err);
    }
});

/**
 * @api {get} https://localhost/api/users/:id Busca Usuário
 * @apiDescription Busca usuário pelo ID
 * @apiName GetUsersID
 * @apiGroup message-api
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost/api/users/5cdb4ee81fe76800228cfa5b' \
 *    -H 'Authorization: Bearer CJstk7cypEDwaFW4...'
 *
 * @apiParam {String} id Identificador único do cliente
 *
 * @apiSuccess {String} id Identificador único do cliente
 * @apiSuccess {String} name Nome do usuário
 * @apiSuccess {Number} budget Saldo do cliente
 * @apiSuccess {Number} messageSentCount Quantidade de envio de mensagens
 * @apiSuccess {String} createdAt Data de criação do usuário
 *
 * @apiSuccessExample {json} Success-Response
 * {
 *     "budget": 10,
 *     "messageSentCount": 0,
 *     "name": "laisson",
 *     "createdAt": "2019-05-14T23:27:36.705Z",
 *     "id": "5cdb4ee81fe76800228cfa5b"
 * }
 *
 * @apiError {String} message Mensagem de erro retornada
 *
 * @apiErrorExample {json} Error-Response
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": "Usuário 'Nome do usuário' não possui mais saldos para o envio de mensagens."
 * }
 */
router.get('/:id', async (req, res, next) => {
    const userID = req.params.id;
    LOGGER.info(`[API-USERS] Pesquisando usuário pelo ID: '${userID}'`);
    try {
        const user = await UserCtrl.findById(userID);
        res.json(user || {});
    } catch (err) {
        next(err);
    }
});

/**
 * @api {post} https://localhost/api/users Adiciona Usuário
 * @apiDescription Adiciona um novo usuário
 * @apiName PostUsers
 * @apiGroup message-api
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 * curl -X POST \
 *   'http://localhost:9090/api/users' \
 *   -H 'Authorization: Bearer CJstk7cypEDwaFW4...' \
 *   -H 'Content-Type: application/json' \
 *   -d '{
 *         "name": "Um novo usuário",
 *         "username": "novo usuário",
 *         "password": "senhaTeste",
 *       }'
 *
 * @apiParam {String} name Nome do usuário
 * @apiParam {String} username Login de usuário
 * @apiParam {String} password Senha do suário
 *
 * @apiParamExample {json} Request-Example
 * {
 *    "name": "Um novo usuário"
 *    "username": "novo usuário",
 *    "password": "senhaTeste",
 * }
 *
 * @apiSuccessExample {json} Success-Response
 * HTTP/1.1 200 OK
 */
router.post('/', async (req, res, next) => {
    const user = req.body;
    LOGGER.info('[API-USERS] Criando novo usuário');
    try {
        await UserCtrl.save(user);
        LOGGER.info(`[API-USERS] Usuário '${user.name}' salvo com sucesso!`);
        res.end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;