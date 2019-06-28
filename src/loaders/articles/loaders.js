import DataLoader from 'dataloader';
import PostModel from '../../models/Articles/Post';
import GalleryModel from '../../models/Articles/Gallery';
import { postProjection, galleryProjection } from '../../models/projections/articles/article';
import { mapToIds1to1, sortByPublishingDate } from '../helpers';

/**
 * Loads data from the DB and caches it for this request
 * @param {array} ids Ids received from the resolver.
 * @return {array} The result at the same position where the id was.
 */

const articleById = new DataLoader(
  async ids => mapToIds1to1(
    ids,
    await Promise.all([
      PostModel.find({ _id: { $in: ids }, published: true }, postProjection),
      GalleryModel.find({ _id: { $in: ids }, published: true, attachedOnly: false }, galleryProjection),
    ])
      .then(([Posts, Galleries]) => sortByPublishingDate(Posts.concat(Galleries))),
  ),
  {
    cacheKeyFn: key => String(key),
  },
);

const galleryById = new DataLoader(
  async ids => mapToIds1to1(
    ids,
    await GalleryModel.find({ _id: { $in: ids }, published: true }, galleryProjection),
  ),
  {
    cacheKeyFn: key => String(key),
  },
);

export default { articleById, galleryById };
