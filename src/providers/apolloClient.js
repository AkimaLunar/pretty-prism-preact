// Apollo
import { GRAPHQL } from '../config';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  split
} from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';

import AuthProvider from './AuthProvider';
const PATH = GRAPHQL;
//const PATH = 'localhost:8282';

const httpLink = new createUploadLink({
  uri: `http://${PATH}/graphql`
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = AuthProvider.getToken();
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: `ws://${PATH}/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: AuthProvider.getToken()
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuthToken
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default apolloClient;
