const { gql } = require('apollo-server-express');

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBoods: [Book]
  }
  type Auth {
    token: String!
    user: User
  }
  type Book {
    _id: ID!
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me( _id: String || username: String ): User
  }
  
  input bookInfo {
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    addUser( username: String!, email: String!, Password: String! ): Auth
    loginUser( username: String!, email: String!, Password: String! ): Auth
    saveBook( bookInfo ): User
    removeBook(bookId: String!): User
  }
`