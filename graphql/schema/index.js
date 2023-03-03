const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Post {
  _id: ID!
  title: String!
  description: String!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdPosts: [Post!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input PostInput {
  title: String!
  description: String!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
