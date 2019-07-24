import { mergeTypes } from 'merge-graphql-schemas'
import User from './User/index';
import Gig from './Gig'

const typeDefs = [User, Gig];

export default mergeTypes(typeDefs, { all: true });