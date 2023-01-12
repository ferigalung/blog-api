const db = require('../../../app/helpers/databases/mongodb/db');

const findManyTopics = async (params) => {
  return db.findMany({ collection: 'topics' }, { params, projects: { _id: 0 } });
};

const findPaginatedTopics = async ({ search, page, size, sortBy, order }) => {
  return db.findPaginated({ collection: 'topics' }, {
    params: {
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]
    },
    page,
    size,
    projects: { _id: 0 },
    sortParams: { [sortBy]: order }
  });
};

const findOneTopic = async (params) => {
  return db.findOne({ collection: 'topics' }, { params, projects: { _id: 0 } });
};

module.exports = {
  findManyTopics,
  findOneTopic,
  findPaginatedTopics
};
