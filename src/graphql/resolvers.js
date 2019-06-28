import JSON from 'graphql-type-json';
import {
  EmailAddress,
  URL,
  PhoneNumber,
} from '@okgrow/graphql-scalars';
import {
  Query as ArticleQuery,
  Articles,
  Article,
  Post,
  Gallery,
} from './articles/resolvers';
import { User, Query as UserQuery } from './users/resolvers';
import { Image } from './images/resolvers';
import Date from './scalar/Date';

/**
 * Bundles all resolvers into one object and merges all Query resolvers into one.
 * Scalars of the baseSchema are added here.
 * @author: Ben Hesseldieck
 * @exports {object} collection of all resolvers.
 */

export default {
  Query: {
    ...ArticleQuery,
    ...UserQuery,
  },
  Gallery,
  Articles,
  Article,
  Post,
  User,
  Image,
  Date,
  JSON,
  EmailAddress,
  URL,
  PhoneNumber,
};
