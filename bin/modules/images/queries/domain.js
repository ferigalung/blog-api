const query = require('./query');
const { NotFoundError } = require('../../../app/helpers/errors');
const { minioPublicEndpoint } = require('../../../app/configs/global_config');

const getAllImages = async (payload) => {
  const { page, size, search, sortBy, order } = payload;
  const images = await query.findPaginatedImages({ search, page, size, sortBy, order });
  images.result = images.result.map(image => ({
    ...image,
    imgUrl: minioPublicEndpoint + image.filename
  }));
  return images;
};

const getOneImage = async (payload) => {
  const image = await query.findOneImage({ imgId: payload.imgId });
  if (!image) {
    throw new NotFoundError(`No image found with id of "${payload.imgId}"`);
  }
  return { ...image, imgUrl: minioPublicEndpoint + image.filename };
};

module.exports = {
  getAllImages,
  getOneImage
};
