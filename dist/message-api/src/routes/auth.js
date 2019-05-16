/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 *
 * API /auth
 */
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

const LOGGER = require('../lib/logger');

/**
 * @api {post} http://localhost:9090/api/auth/login Autenticação
 * @apiDescription Authenticação do usuário
 * @apiName login
 * @apiGroup message-api
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X POST \
 *    'http://localhost:9090/api/auth/login' \
 *      -H 'Content-Type: application/json' \
 *      -d '{
 *      	"username": "usuario",
 *      	"password": "senha"
 *      }'
 *
 * @apiParam {String} username Usuário de acesso
 * @apiParam {String} password Senha de acesso
 * @apiParamExample {json} Request-Example:
 *  {
 *  	"username": "usuario",
 *  	"password": "senha"
 *  }
 *
 * @apiSuccess {String} token Token de acesso do usuário
 * @apiSuccessExample {json} Success-Response
 * {
 *     "token": "sjdlasjlsdjpweorpw...."
 * }
 */
router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            let message = 'Falha ao tentar efetuar o login';
            if (err) message = err.message;
            if (info) message = info.message;
            LOGGER.error(`[auth] ${message}`, err);
            return res.status(400).json({ message });
        }
        req.login(user, { session: false }, err => {
            if (err) return res.send(err);
            const token = jwt.sign(user.toJSON(), __CONFIG.secretKey);
            return res.json({ token });
        });
    })(req, res);
});

router.get('/test', (req, res) => {
    LOGGER.info('Test');
    res.end();
});

module.exports = router;
