const query = require('./query');
const { NotFoundError } = require('../../../app/helpers/errors');

const getAllTopics = async (payload) => {
  const { page, size, search, sortBy, order } = payload;
  return query.findPaginatedTopics({ search, page, size, sortBy, order });
};

const getOneTopic = async (payload) => {
  const topic = await query.findOneTopic({ topicId: payload.topicId });
  if (!topic) {
    throw new NotFoundError(`No topic found with id of "${payload.topicId}"`);
  }
  return topic;
};

module.exports = {
  getAllTopics,
  getOneTopic
};
