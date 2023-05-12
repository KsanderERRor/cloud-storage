/* eslint-disable object-shorthand */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('node:fs');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// const {graphqlUploadExpress} = require('graphql-upload')

const root = require('./resolvers');

const schema = buildSchema(fs.readFileSync('server/graphql/schema.graphql').toString());

const apiGraphQL = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
});

module.exports = apiGraphQL;
