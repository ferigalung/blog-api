const db = require('../../../app/helpers/databases/mongodb/db');

const insertOneTopic = async (docs) => {
  return db.insertOne({ collection: 'topics' }, docs);
};

const updateOneTopic = async (topicId, docs) => {
  return db.updateOne({ collection: 'topics' }, { topicId }, docs);
};

const deleteOneTopic = async (topicId) => {
  return db.deleteOne({ collection: 'topics' }, { topicId });
};

module.exports = {
  insertOneTopic,
  updateOneTopic,
  deleteOneTopic
};
