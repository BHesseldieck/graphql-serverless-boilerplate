/**
 * Resolve the types defined in the schema.
 * @param {object} dbObject is the response object from the database.
 * @param {object} context for the request. Provides the DataLoaders.
 * @returns {type} defined in the schema.
 */

export const Image = {
  taggedUsers: (dbImage, _, context) => context.loaders.userById.loadMany(dbImage.taggedUsers),
};
