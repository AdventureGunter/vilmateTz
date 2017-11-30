/**
 * Created by Stas on 24.07.2017.
 */
const Message = require('../db/models/message');

module.exports.getMessagesList = function (req, res, next) {
    return Message.find({userId: req.user._id})
        .then(messages => res.json({
                success: true,
                messages: messages
            }).status(200)
        )
        .catch(err => next(err))
};

module.exports.getMessagesArchive = function (req, res, next) {
    return Message.find({userId: req.user._id, archived: true})
        .then(messages => res.json({
                success: true,
                messages: messages
            }).status(200)
        )
        .catch(err => next(err))
};

module.exports.getMessage = function (req, res, next) {
    return Message.findById(req.params.id)
        .then(message => res.json({
                success: true,
                message: message
            }).status(200)
        )
        .catch(err => next(err))
};

module.exports.archiveMessage = function (req, res, next) {
    return Message.findOneAndUpdate({_id: req.params.id}, {archived: true}, {'new': true, upsert : true, returnNewDocument : true})
        .then(() => res.json({
                success: true
            }).status(200)
        )
        .catch(err => next(err))
};

module.exports.parseMessagesJson = function (req, res, next) {
    console.log(req.file.buffer);
    let messagesArr = JSON.parse(req.file.buffer).messages;
    messagesArr = messagesArr.map(item => ({
            userId: req.user._id,
            sender: item.sender,
            subject: item.subject,
            message: item.message,
            timeSent: item.time_sent
        })
    );
    return Message.create(messagesArr)
        .then(() => Message.find())
        .then(messages => res.json({
                messages: messages
            }).status(200)
        )
        .catch(err => next(err))
};