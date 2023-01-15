const Joi = require('joi');

const insertManyImages = Joi.object({
  images: Joi.array().items(Joi.object({
    mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/JPEG').required(),
    size: Joi.number().max(2097152).required() // max 2mb
  }).unknown()).min(1).max(5).required()
});

const deleteManyImages = Joi.object({
  imgIds: Joi.array().items().required()
});

module.exports = {
  insertManyImages,
  deleteManyImages
};
