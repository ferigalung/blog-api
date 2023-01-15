const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const query = require('../queries/query');
const { InternalServerError, UnprocessableEntityError } = require('../../../app/helpers/errors');
const { isEmpty, toLower, replace, difference } = require('lodash');
const minio = require('../../../app/helpers/utils/minio');
const { minioPublicEndpoint } = require('../../../app/configs/global_config');

const insertManyImages = async (payload) => {
  const { images } = payload;
  const promises = images.map(async image => {
    const slug = replace(toLower(image.originalname), ' ', '-');
    return minio.bufferObjectUpload({
      objectName: `${Date.now()}-${slug}`,
      buffer: image.buffer,
      meta: { 'Content-Type': image.mimetype }
    });
  });

  const uploadMany = await Promise.allSettled(promises);
  const uploaded = uploadMany.filter(upload => upload.status === 'fulfilled')
    .map(upload => ({
      imgId: uuidv4(),
      filename: upload.value,
      createdAt: new Date()
    }));
  const unUploaded = uploadMany.filter(upload => upload.status !== 'fulfilled')
    .map(upload => ({
      filename: upload.value
    }));

  if (unUploaded.length === images.length) {
    throw new InternalServerError({ msg: 'Failed to upload images', data: { uploaded, unUploaded } });
  }

  await command.insertManyImages(uploaded);
  return {
    uploaded: uploaded.map(file => ({
      ...file,
      imgUrl: minioPublicEndpoint + file.filename
    })),
    unUploaded
  };
};

const deleteManyImages = async (payload) => {
  const { imgIds } = payload;

  const resultData = {
    data: [],
    failed: 0,
    success: 0
  };
  const images = await query.findManyImages({ $in: imgIds });
  const dataImgId = images.map(image => (image.imgId));
  const diff = difference(imgIds, dataImgId);
  if (!isEmpty(diff)) {
    resultData.data.push(diff);
    resultData.failed += diff.length;
  }

  // delete docs in database
  const deleteImages = await command.deleteManyImages({ $in: dataImgId });
  if (deleteImages instanceof Error) {
    resultData.data.push(dataImgId);
    resultData.failed += dataImgId.length;
  } else {
    resultData.success += dataImgId.length;
  }

  if (resultData.failed === imgIds.length) {
    throw new UnprocessableEntityError({ msg: 'Unable to delete images', data: resultData });
  }

  // delete file in S3
  const toBeDelete = images.map(async image => {
    return minio.objectRemove({ objectName: image.filename });
  });
  Promise.all(toBeDelete);

  return resultData;
};

module.exports = {
  insertManyImages,
  deleteManyImages
};
