const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const query = require('../queries/query');
const { UnprocessableEntityError } = require('../../../app/helpers/errors');
const { isEmpty, toLower, replace } = require('lodash');

const insertOneTopic = async (payload) => {
  const { name } = payload;
  const slug = replace(toLower(name), ' ', '-');

  const topicExist = await query.findOneTopic({ slug });
  if (!isEmpty(topicExist)) {
    throw new UnprocessableEntityError(`Topic with name of '${name}' already exist!`);
  }

  const now = new Date();
  const insert = await command.insertOneTopic({
    topicId: uuidv4(),
    name,
    slug,
    createdAt: now,
    updatedAt: now
  });

  delete insert._id;
  return insert;
};

const checkTopic = async (topicId) => {
  const topic = await query.findOneTopic({ topicId });
  if (isEmpty(topic)) { throw new UnprocessableEntityError(`There's no topic with id of ${topicId}`); };
  return topic;
};

const updateOneTopic = async (payload) => {
  await checkTopic(payload.topicId);
  const updateOne = await command.updateOneTopic(payload.topicId, {
    name: payload.name,
    slug: replace(toLower(payload.name), ' ', '-'),
    updatedAt: new Date()
  });

  delete updateOne._id;
  return updateOne;
};

const deleteOneTopic = async (payload) => {
  await checkTopic(payload.topicId);
  await command.deleteOneTopic(payload.topicId);
  return payload;
};

module.exports = {
  insertOneTopic,
  updateOneTopic,
  deleteOneTopic
};
