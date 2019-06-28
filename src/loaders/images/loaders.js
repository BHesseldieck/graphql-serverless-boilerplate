import DataLoader from 'dataloader';
import ImageModel from '../../models/Images/Image';
import { imageProjection } from '../../models/projections/images/image';
import { mapToIds1to1, mapToIds1toMany } from '../helpers';

/**
 * Loads data from the DB and caches it for this request
 * @param {array} ids Ids received from the resolver.
 * @return {array} The result at the same position where the id was.
 */

exports.imageById = new DataLoader(
  async ids => mapToIds1to1(ids, await ImageModel.find({
    _id: { $in: ids },
  }, imageProjection)),
  {
    cacheKeyFn: key => String(key),
  },
);

exports.galleryImages = new DataLoader(
  async ids => mapToIds1toMany(ids, await ImageModel.find({ galleryId: { $in: ids } }, imageProjection).exec(), 'galleryId'),
  {
    cacheKeyFn: key => String(key),
  },
);
