import { mergeResolvers } from 'merge-graphql-schemas'
import User from './User/index';
import Gig from './Gig/index';

const resolvers = [User, Gig];

export default mergeResolvers(resolvers);