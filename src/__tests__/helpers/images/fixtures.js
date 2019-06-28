import userFixtures from '../users/fixtures';

const { userStruct } = userFixtures.actuals;

const imageStruct = {
  id: '5afd2b1b930adf00074d4de0',
  title: 'Beautiful Sundowner',
  uri: 'https://cdn.pixabay.com/photo/2019/05/29/20/01/sunset-4238445_1280.jpg',
  published: true,
  resolution: '1280x640',
  taggedUsers: [userStruct, userStruct, userStruct],
};

module.exports = {
  actuals: {
    imageStruct,
  },
};
