const Joi = require('joi');

const getOneImage = Joi.object({
  imgId: Joi.string().guid({ version: 'uuidv4' }).required()
});

const getAllImages = Joi.object({
  page: Joi.number().integer().positive().required(),
  size: Joi.number().integer().positive().max(100).required(),
  search: Joi.string().optional().allow(null, ''),
  sortBy: Joi.string().valid('name', 'createdAt').default('createdAt'),
  order: Joi.string().valid('desc', 'asc').default('desc')
});

module.exports = {
  getOneImage,
  getAllImages
};
