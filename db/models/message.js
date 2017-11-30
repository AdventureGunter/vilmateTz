/**
 * Created by Stas on 26.10.2017.
 */
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    read: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    },
    archived: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    },
    sender: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    timeSent: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now()
    }
}, {timestamps : true});


let Message = mongoose.model('Message', messageSchema);

module.exports = Message;