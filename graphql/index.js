import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types/index'
import resolvers from './resolvers/index'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;