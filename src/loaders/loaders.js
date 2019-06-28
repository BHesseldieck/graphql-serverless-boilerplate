import userLoaders from './users/loaders';
import imageLoaders from './images/loaders';
import articleLoaders from './articles/loaders';

/**
 * Bundles all loaders into a single object for easy access via the context in the resolvers
 * @author: Ben Hesseldieck
 * @exports {object} collection of all loaders.
 */

export default {
  ...userLoaders,
  ...imageLoaders,
  ...articleLoaders,
};
