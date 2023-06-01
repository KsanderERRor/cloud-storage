/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import { graphqlUploadExpress } from 'graphql-upload-minimal';
import config from './configs/variables';
import mainRouter from './api/api.router';
import swaggerDocument from './swagger.json';
import grapglRouter from './graphql/graphql.router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('debug', true);
mongoose.connect(config.MONGO_URL);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', mainRouter);
app.use(
  graphqlUploadExpress({
    maxFileSize: 30000000,
    maxFiles: 20
  })
);
app.use('/graphql', grapglRouter);

try {
  app.listen(config.PORT, () => {
    console.log(`app listen ${config.PORT}`);
  });
} catch (e) {
  console.log(e);
}