const userFragment = `
  id
  firstName
  lastName
  fullName
  title
  email
  phone
  image {
    id
    uri
    resolution
  }
`;

const imageFragment = `
  image {
    id
    title
    uri
    resolution
    taggedUsers: {
      ${userFragment}
    },
  }
`;

module.exports = {
  imageFragment,
  userFragment,
};
