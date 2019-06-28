const Image = `
type Image {
  id: ID!
  title: String,
  uri: URL!,
  resolution: String,
  taggedUsers: [User],
}
`;

export default Image;
