import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://31.43.234.16:8087/graphql',
    cache: new InMemoryCache(),
});

export default client;
