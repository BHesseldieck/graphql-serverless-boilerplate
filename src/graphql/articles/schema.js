const baseArticle = `
  id: ID!
  title: String!
  author: User!
  category: String
  publishing_date: Date!
`;


const Article = `
extend type Query {
    articles(page: Int, limit: Int, categories: [String], author: ID): [Articles]
    article(id: ID!, type: String!): Article
    galleries(page: Int, limit: Int, categories: [String], author: ID): [Gallery]
    posts(page: Int, limit: Int, categories: [String], author: ID): [Post]
}

interface Article {
  ${baseArticle}
}

type Gallery implements Article {
  ${baseArticle}
  description: String
  images: [Image]!
}

type Post implements Article {
  ${baseArticle}
  attachedGallery: Gallery
  likes: Int
  body: String!
  previewText: String
  heroImage: Image!
}

union Articles = Post | Gallery

`;

export default Article;
