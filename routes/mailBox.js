/**
 * Created by Stas on 20.07.2017.
 */
const express = require('express');
const router = express.Router();
const multipartParser = require('../helpers/multer').multipartParser;
const sessionController = require('../controllers/sessionController');

const controller = require('../controllers/mailBoxController');
const validator = require('../validators/mailBoxValidator');

router.use(sessionController.checkAccessToken);

router.get('/messages', controller.getMessagesList);
router.get('/messages/archive',controller.getMessagesArchive);
router.get('/messages/:id', validator.validateParamsId, controller.getMessage);

router.patch('/messages/archive/:id', validator.validateParamsId, controller.archiveMessage);

router.patch('/messages/json-to-db', multipartParser, controller.parseMessagesJson);

module.exports = router;