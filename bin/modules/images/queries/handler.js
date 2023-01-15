const domain = require('./domain');
const queryModel = require('./query_model');
const validate = require('../../../app/helpers/utils/validate');
const logger = require('../../../app/helpers/utils/logger');
const wrapper = require('../../../app/helpers/utils/wrapper');
const ctx = 'images::queries::handler';

const getAllImages = async (req, res, next) => {
  const { error, value } = validate(queryModel.getAllImages, req.query);
  if (error) { return next(error); }

  try {
    const images = await domain.getAllImages(value);
    res.json(wrapper.success({ data: images.result, meta: images.meta, msg: 'Successfully get images' }));
  } catch (err) {
    logger.error(err, ctx, 'getAllImage');
    next(err);
  }
};

const getOneImage = async (req, res, next) => {
  const { error, value } = validate(queryModel.getOneImage, req.params);
  if (error) { return next(error); }

  try {
    const result = await domain.getOneImage(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully get images' }));
  } catch (err) {
    logger.error(err, ctx, 'getOneImage');
    next(err);
  }
};

module.exports = {
  getAllImages,
  getOneImage
};
