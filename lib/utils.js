/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const moment = require('moment-timezone');
const crypto = require('crypto');
moment.locale('pt-br');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const dateFormat = () => moment().tz('America/Sao_Paulo').format('L LTS');

const createHash = (data, algorithm = 'sha1', encoding = 'hex') => {
    return crypto.createHash(algorithm).update(data, 'utf8').digest(encoding);
};

const configPassport = () => {
    const LOGGER = require('../lib/logger');
    const UsersCtrl = require('../controllers/UsersCtrl');
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, cb) => {
        LOGGER.info(`[PASSPORT] Validando login para o usuário '${username}'`);
        try {
            const user = await UsersCtrl.find(username);
            if (!user || !user.comparePassword(password)) {
                cb(null, false, { message: 'Usuário ou Senha incorreta' });
            }
            cb(null, user, { message: 'Login efetuado com sucesso' });
        } catch (err) {
            cb(err);
        }
    }));
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: __CONFIG.secretKey
    }, async (jwtPayload, cb) => {
        try {
            const userID = jwtPayload._id;
            LOGGER.info(`[PASSPORT] Validando token para usuário '${userID}'`);
            const user = await UsersCtrl.findById(userID);
            cb(null, user);
        } catch (err) {
            cb(err);
        }
    }));
};

module.exports = { dateFormat, configPassport, createHash };