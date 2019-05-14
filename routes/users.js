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
 * @api {get} https://localhost/message-api/users Lista Clientes
 * @apiDescription Lista os clientes da DGT cadastrados e suas fontes
 * @apiName GetUsers
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.1
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost/message-api/users' -H 'Authorization: Bearer skdlkjlkje....'
 *
 * @apiSuccess {String} _id Identificador único do cliente
 * @apiSuccess {String} name Nome do cliente
 * @apiSuccess {String} username Nome de usuário do cliente
 * @apiSuccess {String} password Senha do cliente
 * @apiSuccess {String} token Token de validação do cliente
 * @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
 * @apiSuccess {String} actions._id Identificador único da fonte
 * @apiSuccess {String} actions.name Nome da fonte
 * @apiSuccess {String} actions.version Versão da fonte
 * @apiSuccess {String} actions.versionDate Data da versão da fonte
 * @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
 * @apiSuccess {String} actionsInstalled._id Identificador único da fonte
 * @apiSuccess {String} actionsInstalled.name Nome da fonte
 * @apiSuccess {String} actionsInstalled.version Versão da fonte
 * @apiSuccess {String} actionsInstalled.versionDate Data da versão da fonte
 *
 * @apiSuccessExample {json} Success-Response
 * [
 *     {
 *         "_id": "5c0c056d8abbb3aaa833dfba",
 *         "name": "Laisson R. Silveira",
 *         "username": "laisson",
 *         "password": "42b3da517f9e384f43bcd7592bc2e900f54f725d",
 *         "token": "4c749356680a61faee4753b116c6db441e923c538ff2e129de1be5cef7ec5506",
 *         "actions": [
 *             {
 *                 "_id": "5c11bdb20ed9c94a52d09fce",
 *                 "name": "facebook",
 *                 "version": "1.0.8",
 *                 "versionDate": "2018-12-13T02:02:26.259Z"
 *             },
 *             {
 *                 "_id": "5c1abb45e076277b959efdd9",
 *                 "name": "goldencross",
 *                 "version": "1.0.1",
 *                 "versionDate": "2018-12-19T21:42:29.930Z"
 *             },
 *             {
 *                 "_id": "5c1abb4be076277b959efdde",
 *                 "name": "amil",
 *                 "version": "1.0.8",
 *                 "versionDate": "2018-12-19T21:42:35.569Z"
 *             }
 *         ],
 *         "actionsInstalled": [
 *             {
 *                 "versionDate": "2018-12-19T23:46:00.048Z",
 *                 "_id": "5c1ad838459e1936db11df86",
 *                 "name": "bradesco",
 *                 "version": "1.0.4"
 *             },
 *             {
 *                 "versionDate": "2018-12-19T23:46:00.048Z",
 *                 "_id": "5c1ad838459e1936db11df85",
 *                 "name": "facebook",
 *                 "version": "1.0.8"
 *             }
 *         ]
 *     }
 * ]
 */
router.get('/', (req, res, next) => {
    const username = req.query.username;
    if (username) {
        LOGGER.info(`[API-USERS] Pesquisando usuário pelo username: '${username}'`);
        UserCtrl.find(username)
            .then(user => res.json(user))
            .catch(err => next(err));
    } else {
        LOGGER.info('[API-USERS] Buscando por todos os usuários');
        UserCtrl.findAll().then(users => res.json(users)).catch(err => next(err));
    }
});

/**
 * @api {get} https://localhost/message-api/users/:id Busca Cliente
 * @apiDescription Busca cliente pelo ID
 * @apiName GetUsersID
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.1
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost/message-api/users/5c0c056d8abbb3aaa833dfba' -H 'Authorization: Bearer skdlkjlkje....'
 *
 * @apiParam {String} id Identificador único do cliente
 *
 * @apiSuccess {String} _id Identificador único do cliente
 * @apiSuccess {String} name Nome do cliente
 * @apiSuccess {String} username Nome de usuário do cliente
 * @apiSuccess {String} password Senha do cliente
 * @apiSuccess {String} token Token de validação do cliente
 * @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
 * @apiSuccess {String} actions._id Identificador único da fonte
 * @apiSuccess {String} actions.name Nome da fonte
 * @apiSuccess {String} actions.version Versão da fonte
 * @apiSuccess {String} actions.versionDate Data da versão da fonte
 * @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
 * @apiSuccess {String} actionsInstalled._id Identificador único da fonte
 * @apiSuccess {String} actionsInstalled.name Nome da fonte
 * @apiSuccess {String} actionsInstalled.version Versão da fonte
 * @apiSuccess {String} actionsInstalled.versionDate Data da versão da fonte
 *
 * @apiSuccessExample {json} Success-Response
 * {
 *     "_id": "5c0c056d8abbb3aaa833dfba",
 *     "name": "Laisson R. Silveira",
 *     "username": "laisson",
 *     "password": "42b3da517f9e384f43bcd7592bc2e900f54f725d",
 *     "token": "4c749356680a61faee4753b116c6db441e923c538ff2e129de1be5cef7ec5506",
 *     "actions": [
 *         {
 *             "_id": "5c11bdb20ed9c94a52d09fce",
 *             "name": "facebook",
 *             "version": "1.0.8",
 *             "versionDate": "2018-12-13T02:02:26.259Z"
 *         },
 *         {
 *             "_id": "5c1abb45e076277b959efdd9",
 *             "name": "goldencross",
 *             "version": "1.0.1",
 *             "versionDate": "2018-12-19T21:42:29.930Z"
 *         },
 *         {
 *             "_id": "5c1abb4be076277b959efdde",
 *             "name": "amil",
 *             "version": "1.0.8",
 *             "versionDate": "2018-12-19T21:42:35.569Z"
 *         }
 *     ],
 *     "actionsInstalled": [
 *         {
 *             "versionDate": "2018-12-19T23:46:00.048Z",
 *             "_id": "5c1ad838459e1936db11df86",
 *             "name": "bradesco",
 *             "version": "1.0.4"
 *         },
 *         {
 *             "versionDate": "2018-12-19T23:46:00.048Z",
 *             "_id": "5c1ad838459e1936db11df85",
 *             "name": "facebook",
 *             "version": "1.0.8"
 *         }
 *     ]
 * }
 */
router.get('/:id', async (req, res, next) => {
    const userID = req.params.id;
    LOGGER.info(`[API-USERS] Pesquisando usuário pelo ID: '${userID}'`);
    try {
        const user = await UserCtrl.findById(userID);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

/**
 * @api {post} https://localhost/message-api/users Adiciona Cliente
 * @apiDescription Adiciona um novo cliente
 * @apiName PostUsers
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.1
 *
 * @apiExample {curl} Example usage:
 * curl -X POST \
 *   'https://localhost/message-api/users' \
 *   -H 'Authorization: Bearer CJstk7cypEDwaFW4...' \
 *   -H 'Content-Type: application/json' \
 *   -d '{
 *         "name": "Um novo usuário"
 *         "username": "novo usuário",
 *         "password": "senhaTeste",
 *      }'
 *
 * @apiParam {String} name Nome do cliente
 * @apiParam {String} username Nome de usuário para o cliente
 * @apiParam {String} password Senha do cliente
 * @apiParamExample {json} Request-Example
 * {
 *    "name": "Um novo usuário"
 *    "username": "novo usuário",
 *    "password": "senhaTeste",
 * }
 *
 * @apiSuccess {String} _id Identificador único do cliente
 * @apiSuccess {String} name Nome do cliente
 * @apiSuccess {String} username Nome de usuário do cliente
 * @apiSuccess {String} password Senha do cliente
 * @apiSuccess {String} token Token de validação do cliente
 * @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
 * @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
 *
 * @apiSuccessExample {json} Success-Response
 * {
 *     "_id": "5c1c5ad37ba5fb5256145df7",
 *     "username": "novo usuário",
 *     "password": "5083acb4a3c0e6510b00eac9c5ed268cb6638450",
 *     "name": "Um novo usuário",
 *     "actions": [],
 *     "actionsInstalled": []
 * }
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