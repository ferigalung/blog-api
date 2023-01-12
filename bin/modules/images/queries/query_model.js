const Joi = require('joi');

const getOneTopic = Joi.object({
  topicId: Joi.string().guid({ version: 'uuidv4' }).required()
});

const getAllTopics = Joi.object({
  page: Joi.number().integer().positive().required(),
  size: Joi.number().integer().positive().max(100).required(),
  search: Joi.string().optional().allow(null, ''),
  sortBy: Joi.string().valid('name', 'createdAt').default('createdAt'),
  order: Joi.string().valid('desc', 'asc').default('desc')
});

module.exports = {
  getOneTopic,
  getAllTopics
};
