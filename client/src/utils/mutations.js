import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: bookParams) {
    saveBook(input: $input) {
      user
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: Int!) {
    removeBook(bookId: $bookId) {
      user
    }
  }
`;

