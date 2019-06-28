import DataLoader from 'dataloader/index';
import UserModel from '../../models/Users/User';
import { userProjection } from '../../models/projections/users/user';
import { mapToIds1to1 } from '../helpers';

/**
 * Loads data from the DB and caches it for this request
 * @param {array} ids Ids received from the resolver.
 * @return {array} The result at the same position where the id was.
 */

exports.userById = new DataLoader(
  async ids => mapToIds1to1(
    ids,
    await UserModel.find({ _id: { $in: ids } }, userProjection)
      .sort({ last_name: 1 })
      .exec(),
  ),
  {
    cacheKeyFn: key => String(key),
  },
);
