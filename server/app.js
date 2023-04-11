/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const { PORT, MONGO_URL } = require('./configs/variables');
const mainRouter = require('./api/api.router');
const swaggerDocument = require('../swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('debug', true);
mongoose.connect(MONGO_URL);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', mainRouter);

try {
  app.listen(PORT, () => {
    console.log(`app listen ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
