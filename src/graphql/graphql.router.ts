import fs from 'node:fs';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import root from './resolvers';

const schema = buildSchema(fs.readFileSync('src/graphql/schema.graphql').toString());

const apiGraphQL = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
});

export default apiGraphQL;
