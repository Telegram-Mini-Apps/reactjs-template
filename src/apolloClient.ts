import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client';
import { URL_GRAPHQL } from './config';

const httpLink = new HttpLink({ uri: URL_GRAPHQL });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('access_token');

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const link = concat(authLink, httpLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
