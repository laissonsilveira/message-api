/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const mongoose = require('mongoose');
const UsersModel = mongoose.model('Users');

class UserCtrl {

    static async findAll() {
        const projection = { username: 0, password: 0 };
        const usersFound = await UsersModel.find({}, projection).lean();
        if (Array.isArray(usersFound)) {
            for (const user of usersFound) {
                user.id = user._id.toString();
                delete user._id;
            }
        }
        return usersFound;
    }

    static async findById(userID) {
        if (!userID.match(/^[0-9a-fA-F]{24}$/)) {
            const error = Error(`ID do usuário (${userID}) inválido`);
            error.isKnown = true;
            throw error;
        }
        const projection = { username: 0, password: 0 };
        const userFound = await UsersModel.findById(userID, projection).lean();
        if (userFound) {
            userFound.id = userFound._id.toString();
            delete userFound._id;
        }
        return userFound;
    }

    static async save(user) {
        const newUser = new UsersModel(user);
        await newUser.save();
    }

    static async updateBudget(userID) {
        const userFound = await UsersModel.findById(userID);
        userFound.budget--;
        userFound.messageSentCount++;
        await userFound.save();
    }

    static async find(username) {
        username = username && username.toLowerCase();
        const filter = { username: { $ne: 'admin', $eq: username } };
        if (username === 'admin') delete filter.username.$ne;
        return await UsersModel.findOne({ username });
    }

}

module.exports = UserCtrl;
