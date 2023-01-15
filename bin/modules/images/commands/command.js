const db = require('../../../app/helpers/databases/mongodb/db');

const insertManyImages = async (docs) => {
  return db.insertMany({ collection: 'images' }, docs);
};

const deleteManyImages = async (params) => {
  return db.deleteMany(params);
};

module.exports = {
  insertManyImages,
  deleteManyImages
};
