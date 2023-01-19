const express = require('express');
const router = express.Router();
const commandHandler = require('../../modules/images/commands/handler');
const queryhandler = require('../../modules/images/queries/handler');
const { verifyJwt } = require('../helpers/auth/jwtAuth');
const multer = require('multer');
const upload = multer();

router.get('/', verifyJwt, queryhandler.getAllImages);
router.get('/:imgId', verifyJwt, queryhandler.getOneImage);
router.post('/', verifyJwt, upload.array('images'), commandHandler.postInsertManyImage);
router.delete('/', verifyJwt, commandHandler.deleteManyImages);

module.exports = router;
