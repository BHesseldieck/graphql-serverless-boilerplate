import GalleryModel from '../../models/Articles/Gallery';
import PostModel from '../../models/Articles/Post';
import { galleryProjection, postProjection } from '../../models/projections/articles/article';

/**
 * Handles the request for the respecting Query
 * @param {object} params an object of the arguments provided in the request.
 * @param {object} context for the request.
 * @return {promise} that resolves to the type defined by the schema.
 */

export const Query = {
  articles: (_, {
    page = 1,
    limit = 10,
    categories,
    author,
  }) => {
    const offset = page - 1;
    const query = {};
    if (author) {
      query.author = author;
    }
    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }
    return Promise.all([
      PostModel.find(query, postProjection)
        .where('published')
        .equals(true)
        .skip(offset * limit)
        .limit(limit)
        .sort({ publishing_date: -1 })
        .exec(),
      GalleryModel.find(query, galleryProjection)
        .where('published')
        .equals(true)
        .where('attachedOnly')
        .equals(false)
        .skip(offset * limit)
        .limit(limit)
        .sort({ publishing_date: -1 })
        .exec(),
    ]);
  },

  article: (_, { id, type }) => type === 'POST' ? PostModel.findById(id, postProjection).exec() : GalleryModel.findById(id, galleryProjection).exec(),

  galleries: (_, {
    page = 1,
    limit = 10,
    categories,
    author,
  }) => {
    const offset = page - 1;
    const query = {};
    if (author) {
      query.author = author;
    }
    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }
    return GalleryModel.find(query, galleryProjection)
      .where('published')
      .equals(true)
      .where('attachedOnly')
      .equals(false)
      .skip(offset * limit)
      .limit(limit)
      .sort({ publishing_date: -1 })
      .exec();
  },

  posts: (_, {
    page = 1,
    limit = 10,
    categories,
    author,
  }) => {
    const offset = page - 1;
    const query = {};
    if (author) {
      query.author = author;
    }
    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }
    return PostModel.find(query, postProjection)
      .where('published')
      .equals(true)
      .skip(offset * limit)
      .limit(limit)
      .sort({ publishing_date: -1 })
      .exec();
  },
};

/**
 * Required by the union and interface to define the type of the response object.
 * @param {object} dbObj is the response object from the database.
 * @returns {string} to define to which resolver the response object should be forwarded.
 */

export const Articles = {
  __resolveType(dbObj) {
    if (dbObj.images) {
      return 'Gallery';
    }
    if (dbObj.body) {
      return 'Post';
    }
    return null;
  },
};

export const Article = {
  __resolveType(dbObj) {
    if (dbObj.images) {
      return 'Gallery';
    }
    if (dbObj.body) {
      return 'Post';
    }
    return null;
  },
};

/**
 * Resolve the types defined in the schema.
 * @param {object} dbObject is the response object from the database.
 * @param {object} context for the request. Provides the DataLoaders.
 * @returns {type} defined in the schema.
 */

export const Gallery = {
  author: (dbGallery, _, context) => context.loaders.userById.load(dbGallery.author),
  images: (dbGallery, _, context) => context.loaders.galleryImages.load(dbGallery.id),
};

export const Post = {
  author: (dbPost, _, context) => context.loaders.userById.load(dbPost.author),
  attachedGallery: (dbPost, _, context) => context.loaders.galleryById.load(dbPost.author),
  heroImage: (dbPost, _, context) => context.loaders.imageById.load(dbPost.heroImage),
};
