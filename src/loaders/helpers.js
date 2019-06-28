/**
 * Assigns data to the corresponding id
 * @author: Ben Hesseldieck
 * @param {array} ids Ids received from the resolver/dataloader
 * @param {array} response the data fetched from the database
  * @param {array} property the property which is used to match the id with an element of the response
  * @return {array} an array where either an object (1to1) or array (1toMany) is at the same position as the related id.
 */

// used if there is one result per id
exports.mapToIds1to1 = (ids, response, property = 'id') => {
  // return null as a result if response is not an array
  if (Array.isArray(response) === false) {
    return ids.map(() => undefined);
  }
  // looping over the response and create a <key, value> map where the relation indicating property is used as the key
  const temp = response.reduce((acc, item) => {
    // id of caller and property's value have to be identical
    acc[item[property]] = item;
    return acc;
  }, {});
  // matching the relation property with the id from the loader, so the result for the id is at the same position as the id.
  return ids.map(id => temp[id]);
};

// used if there are multiple results for one id
exports.mapToIds1toMany = (ids, response, property = 'id') => {
  // return null as a result if response is not an array
  if (Array.isArray(response) === false) {
    return ids.map(() => undefined);
  }
  const temp = response.reduce((acc, item) => {
    // id of caller and property's value have to be identical
    const id = item[property];
    // if key for property's value is not yet set, create an empty array as value
    if (acc[id] === undefined) {
      acc[id] = [];
    }
    // append the item to its corresponding id's array
    acc[id].push(item);
    return acc;
  }, {});
  // matching the relation property with the id from the loader, so the result for the id is at the same position as the id. Note that a list is placed at the position.
  return ids.map(id => temp[id]);
};

/**
 * Sorts an array of objects for the property 'publishing_date'
 * @author: Ben Hesseldieck
 * @param {array} articles a list of article objects.
 * @return {array} the list of articles sorted for 'publishing_date'.
 */

exports.sortByPublishingDate = articles => articles.sort((a, b) => {
  if (a.publishing_date > b.publishing_date) {
    return -1;
  }
  if (a.publishing_date < b.publishing_date) {
    return 1;
  }
  return 0;
});
