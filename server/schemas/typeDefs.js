const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
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
    me(id: String, username: String): User
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
    addUser( username: String!, email: String!, password: String! ): Auth
    loginUser( email: String!, password: String! ): Auth
    saveBook( book: bookInfo! ): User
    removeBook(bookId: String!): User
  }
`
module.exports = typeDefs;