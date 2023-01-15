const domain = require('./domain');
const commandModel = require('./command_model');
const validate = require('../../../app/helpers/utils/validate');
const wrapper = require('../../../app/helpers/utils/wrapper');
const logger = require('../../../app/helpers/utils/logger');
const ctx = 'topics::commands::handler';

const postInsertManyImage = async (req, res, next) => {
  const { error, value } = validate(commandModel.insertManyImages, { images: req.files });
  if (error) { return next(error); }

  try {
    const result = await domain.insertManyImages(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully insert images' }));
  } catch (err) {
    logger.error(err, ctx, 'postInsertManyImage');
    next(err);
  }
};

const deleteManyImages = async (req, res, next) => {
  const { error, value } = validate(commandModel.deleteManyImages, { ...req.body });
  if (error) { return next(error); }

  try {
    const result = await domain.deleteManyImages(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully delete images' }));
  } catch (err) {
    logger.error(err, ctx, 'deleteManyImages');
    next(err);
  }
};

module.exports = {
  postInsertManyImage,
  deleteManyImages
};
