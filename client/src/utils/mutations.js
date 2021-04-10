import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_STATS = gql`
  mutation addStats($makes: Int, $misses: Int, $shotType: String, $x: Int, $y: Int, $courtLocation: Int) {
    addStats(makes: $makes, misses: $misses, shotType: $shotType, x: $x, y: $y, courtLocation: $courtLocation) {
      statsId: ID
      makes: Int
      misses: Int
      shotType: String
      x: Int
      y: Int
      courtLocation: Int
    }
  }
`;

export const REMOVE_RECORD = gql`
  mutation removeRecord($statsId: ID!) {
    removeRecord(statsId: $statsId) {
      statsId: ID
      makes: Int
      misses: Int
      points: String
      shotType: String
      x: Int
      y: Int
      courtLocation: Int
    }
  }
`;
