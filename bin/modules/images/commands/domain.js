const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const query = require('../queries/query');
const { UnprocessableEntityError } = require('../../../app/helpers/errors');
const { isEmpty, toLower, replace } = require('lodash');
const minio = require('../../../app/helpers/utils/minio');
const path = require('path');

const insertManyImages = async (payload) => {
  const { images } = payload;
  const promises = images.map(image => {
    const slug = replace(toLower(image.originalname), ' ', '-');
    return minio.bufferObjectUpload({
      objectName: `${slug}-${Date.now()}${path.extname(image.originalname)}`,
      buffer: image.buffer,
      meta: { 'Content-Type': image.mimetype }
    });
  });

  const uploadMany = await Promise.allSettled(promises);
  const uploaded = uploadMany
    .filter(upload => upload.status === 'fulfilled')
    .map(upload => ({
      imgId: uuidv4(),
      filename: upload.value,
      createdAt: new Date()
    }));
};
module.exports = {
  insertManyImages
};
