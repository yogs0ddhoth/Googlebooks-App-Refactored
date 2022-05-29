import { gql } from '@apollo/client';

export const GET_ME = gql`
query getMe($username: String, $meId: String) {
  me(username: $username, id: $meId) {
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
}`;