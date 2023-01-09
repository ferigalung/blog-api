const domain = require('./domain');
const commandModel = require('./command_model');
const validate = require('../../../app/helpers/utils/validate');
const wrapper = require('../../../app/helpers/utils/wrapper');
const logger = require('../../../app/helpers/utils/logger');
const ctx = 'topics::commands::handler';

const postInsertOneTopic = async (req, res, next) => {
  const { error, value } = validate(commandModel.insertOneTopic, req.body);
  if (error) { return next(error); }

  try {
    const result = await domain.insertOneTopic(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully insert topic' }));
  } catch (err) {
    logger.error(err, ctx, 'postInsertOneTopic');
    next(err);
  }
};

const putUpdateOneTopic = async (req, res, next) => {
  const { error, value } = validate(commandModel.updateOneTopic, {
    ...req.body,
    topicId: req.params.topicId
  });
  if (error) { return next(error); }

  try {
    const result = await domain.updateOneTopic(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully update topic' }));
  } catch (err) {
    logger.error(err, ctx, 'putUpdateOneTopic');
    next(err);
  }
};

const deleteOneTopic = async (req, res, next) => {
  const { error, value } = validate(commandModel.deleteOneTopic, req.params);
  if (error) { return next(error); }

  try {
    const result = await domain.deleteOneTopic(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully delete topic' }));
  } catch (err) {
    logger.error(err, ctx, 'deleteOneTopic');
    next(err);
  }
};

module.exports = {
  postInsertOneTopic,
  putUpdateOneTopic,
  deleteOneTopic
};
