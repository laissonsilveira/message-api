/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const mongoose = require('mongoose');
const MessagesModel = mongoose.model('Messages');
const UsersModel = mongoose.model('Users');

class MessagesCtrl {

    static async findByUser(userID) {
        return await MessagesModel.find({ to: userID }).lean();
    }

    static async save(message) {
        const newMessage = new MessagesModel(message);
        await newMessage.save();
    }

    static async validate(message) {
        let msg;
        if (message.body && message.body.length > 280) {
            msg = 'Quantidade máxima de caracteres permitido excedido. [Máx. 280 caracteres]';
        } else if (message.from) {
            const userFound = await UsersModel.findById(message.from).lean();
            if (userFound.budget === 0) msg = `Usuário '${userFound.name}' não possui mais saldos para o envio de mensagens.`;
        }
        if (msg) {
            const error = new Error(msg);
            error.isKnown = true;
            throw error;
        }
    }

}

module.exports = MessagesCtrl;
