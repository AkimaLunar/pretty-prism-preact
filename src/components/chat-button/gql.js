import gql from 'graphql-tag';

export const CHAT_QUERY = gql`
  query gqlChat($receiverId: String!) {
    chatByUser(receiverId: $receiverId) {
      id
    }
  }
`;
