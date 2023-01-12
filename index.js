require('dotenv').config();
const pkg = require('./package.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { connectToDb } = require('./bin/app/helpers/databases/mongodb/db');
const logger = require('./bin/app/helpers/utils/logger');
const wrapper = require('./bin/app/helpers/utils/wrapper');
const errorHandling = require('./bin/app/helpers/errors/global_error_handler');
const minio = require('./bin/app/helpers/utils/minio');

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// default route
app.get('/', (req, res) => {
  res.json(wrapper.success({ data: null, msg: `${pkg.name} running perfectly` }));
});

// routes
app.use('/topics/v1', require('./bin/app/routes/topics'));
app.use('/users/v1', require('./bin/app/routes/users'));
app.use('/images/v1', require('./bin/app/routes/images'));

// error handling
app.use(errorHandling);

// minio init
minio.init();

// db connection
connectToDb(err => {
  if (!err) {
    logger.info('MongoDB connection set successfully');
    app.listen(port, () => {
      logger.info(`${pkg.name} running and listening on port ${port}`);
    });
    return;
  }
  logger.error('MongoDB connection failed');
});
