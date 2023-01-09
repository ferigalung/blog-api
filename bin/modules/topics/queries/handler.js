const domain = require('./domain');
const queryModel = require('./query_model');
const validate = require('../../../app/helpers/utils/validate');
const logger = require('../../../app/helpers/utils/logger');
const wrapper = require('../../../app/helpers/utils/wrapper');
const ctx = 'topics::queries::handler';

const getAllTopics = async (req, res, next) => {
  const { error, value } = validate(queryModel.getAllTopics, req.query);
  if (error) { return next(error); }

  try {
    const topics = await domain.getAllTopics(value);
    res.json(wrapper.success({ data: topics.result, meta: topics.meta, msg: 'Successfully get topics' }));
  } catch (err) {
    logger.error(err, ctx, 'getAllTopic');
    next(err);
  }
};

const getOneTopic = async (req, res, next) => {
  const { error, value } = validate(queryModel.getOneTopic, req.params);
  if (error) { return next(error); }

  try {
    const result = await domain.getOneTopic(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully get topics' }));
  } catch (err) {
    logger.error(err, ctx, 'getOneTopic');
    next(err);
  }
};

module.exports = {
  getAllTopics,
  getOneTopic
};
