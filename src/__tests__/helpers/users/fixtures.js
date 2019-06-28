import imagesFixtures from '../images/fixtures';

const { imageStruct } = imagesFixtures.actuals;

const userStruct = {
  id: '59a94172fe826eab0687aed8',
  firstName: 'Peter',
  lastName: 'Lustig',
  fullName: 'Peter Lustig',
  title: 'CEO',
  email: 'p.lustig@example.de',
  phone: '+49 (0) 1234 - 5678',
  // articles: [articlesStruct, articlesStruct, articlesStruct],
  image: imageStruct,
};

module.exports = {
  setup: {},
  actuals: {
    userStruct,
  },
};
