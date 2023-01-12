const express = require('express');
const router = express.Router();
const commandHandler = require('../../modules/images/commands/handler');
const queryhandler = require('../../modules/images/queries/handler');
const { verifyJwt } = require('../helpers/auth/jwtAuth');
const basicAuth = require('../../app/helpers/auth/basicAuth');
const multer = require('multer');
const upload = multer();

// router.get('/', basicAuth, queryhandler.getAllImages);
// router.get('/:imgId', basicAuth, queryhandler.getOneImage);
router.post('/', verifyJwt, upload.array('images'), commandHandler.postInsertManyImage);
// router.put('/:imgId', verifyJwt, commandHandler.putUpdateOneImage);
// router.delete('/', verifyJwt, commandHandler.deleteManyImages);

module.exports = router;
