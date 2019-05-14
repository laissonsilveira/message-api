/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const moment = require('moment-timezone');
moment.locale('pt-br');

const dateFormat = () => {
    return moment().tz('America/Sao_Paulo').format('L LTS');
};

module.exports = { dateFormat };