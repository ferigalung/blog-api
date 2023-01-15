const db = require('../../../app/helpers/databases/mongodb/db');

const findManyImages = async (params) => {
  return db.findMany({ collection: 'images' }, { params, projects: { _id: 0 } });
};

const findPaginatedImages = async ({ search, page, size, sortBy, order }) => {
  return db.findPaginated({ collection: 'images' }, {
    params: { filename: new RegExp(search, 'i') },
    page,
    size,
    projects: { _id: 0 },
    sortParams: { [sortBy]: order }
  });
};

const findOneImage = async (params) => {
  return db.findOne({ collection: 'images' }, { params, projects: { _id: 0 } });
};

module.exports = {
  findManyImages,
  findOneImage,
  findPaginatedImages
};
