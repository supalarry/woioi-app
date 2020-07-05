import gql from 'graphql-tag';

export const bye = gql`
  query {
    bye
  }
`;

export const me = gql`
  query {
    me {
      id
      email
    }
  }
`;

export const useFetchUsersQuery = gql`
  query {
    users {
      email
    }
  }
`;

export const useRegisterUserMutation = gql`
  mutation ($email: String!, $username: String!, $password: String!, $mainLang: String!) {
    register (email: $email, username: $username, password: $password, mainLang: $mainLang) {
      accessToken
      user {
        id
        email
        username
        mainLang
      }
    }
  }
`;

export const useLoginUserMutation = gql`
  mutation ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
      accessToken
      user {
        id
        email
        username
        mainLang
      }
    }
  }
`;

export const logout = gql`
  mutation {
    logout
  }
`;
