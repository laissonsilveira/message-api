/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('Messages', MessagesSchema);
