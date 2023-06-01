import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  generates: {
    graphqlTypes: {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
};

export default config;
