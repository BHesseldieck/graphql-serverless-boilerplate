const User = `

extend type Query {
  allUsers: [User]
  user(id: ID, email: EmailAddress): User
}

type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    title: String
    email: EmailAddress!
    phone: PhoneNumber
    image: Image
    articles: [Articles]
}
`;

export default User;
