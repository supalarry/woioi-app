/* eslint-disable import/prefer-default-export */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { getAccessToken, handleAccessTokenExpiration } from '@/auth/accessToken';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  /* credentials includes refresh token cookie */
  credentials: 'include',
});

// Middleware to set access token
const authMiddleware = setContext(async (req, { headers }) => {
  await handleAccessTokenExpiration();
  const accessToken = getAccessToken();
  return {
    headers: {
      authorization: accessToken ? `bearer ${accessToken}` : '',
    },
  };
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});
