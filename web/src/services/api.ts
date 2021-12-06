import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:3333/graphql'
});

const wsLink = process.browser ? new WebSocketLink({
  uri: 'ws://localhost:3333/graphql',
  options: {
    reconnect: true
  }
}) : null;

const splitLink = process.browser ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
) : httpLink;

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  uri: 'http://localhost:3333/graphql',
});
