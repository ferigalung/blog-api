const Joi = require('joi');

const topic = {
  name: Joi.string().required()
};
const insertOneTopic = Joi.object(topic);

const updateOneTopic = Joi.object({
  ...topic,
  topicId: Joi.string().guid({ version: 'uuidv4' }).required()
});

const deleteOneTopic = Joi.object({
  topicId: Joi.string().guid({ version: 'uuidv4' }).required()
});

module.exports = {
  insertOneTopic,
  updateOneTopic,
  deleteOneTopic
};
