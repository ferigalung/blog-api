const express = require('express');
const router = express.Router();
const commandHandler = require('../../modules/topics/commands/handler');
const queryhandler = require('../../modules/topics/queries/handler');
const { verifyJwt } = require('../helpers/auth/jwtAuth');
const basicAuth = require('../../app/helpers/auth/basicAuth');

router.get('/', basicAuth, queryhandler.getAllTopics);
router.get('/:topicId', basicAuth, queryhandler.getOneTopic);
router.post('/', verifyJwt, commandHandler.postInsertOneTopic);
router.put('/:topicId', verifyJwt, commandHandler.putUpdateOneTopic);
router.delete('/:topicId', verifyJwt, commandHandler.deleteOneTopic);

module.exports = router;
