import UserModel from '../../models/Users/User';
import { userProjection } from '../../models/projections/users/user';

/**
 * Handles the request for the respecting Query
 * @param {object} params an object of the arguments provided in the request.
 * @param {object} context for the request.
 * @return {promise} that resolves to the type defined by the schema.
 */

export const Query = {
  allUsers: () => UserModel.find({}, userProjection).exec(),
  user: (_, { id, email }) => {
    const query = {};
    if (id) {
      query.id = id;
    }
    if (email) {
      query.email = email;
    }
    return UserModel.findOne(query, userProjection).exec();
  },

};

/**
 * Resolve the types defined in the schema.
 * @param {object} dbObject is the response object from the database.
 * @param {object} context for the request. Provides the DataLoaders.
 * @returns {type} defined in the schema.
 */

export const User = {
  firstName: dbUser => dbUser.first_name,
  lastName: dbUser => dbUser.last_name,
  fullName: dbUser => `${dbUser.first_name} ${dbUser.last_name}`,
  image: (dbUser, _, context) => context.loaders.imageById.load(dbUser.image),
  articles: (dbUser, _, context) => context.loaders.articleById.loadMany(dbUser.articles),
};
