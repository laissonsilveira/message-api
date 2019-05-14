/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const mongoose = require('mongoose');
const UsersModel = mongoose.model('Users');

class UserCtrl {

    static async findById(userID) {
        const userFound = await UsersModel.findById(userID).lean();
        if(userFound) {
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

}

module.exports = UserCtrl;
