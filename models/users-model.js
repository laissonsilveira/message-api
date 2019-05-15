/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const { createHash } = require('../lib/utils');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    budget: {
        type: Number,
        default: 10
    },
    messageSentCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) user.password = createHash(user.password);
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return this.password === createHash(candidatePassword) || this.password === candidatePassword;
};

module.exports = mongoose.model('Users', UserSchema);