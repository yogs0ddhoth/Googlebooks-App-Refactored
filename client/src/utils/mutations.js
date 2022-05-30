import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }`;

export const ADD_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: bookInfo!) {
    saveBook(book: $book) {
      username
      _id
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      _id
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }`;