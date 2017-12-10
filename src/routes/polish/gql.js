import gql from 'graphql-tag';

export const POLISH_QUERY = gql`
  query gqlPolishQuery($polishId: String!) {
    polish(id: $polishId) {
      id
      name
      images
      owners {
        id
        username
        avatar
      }
      comments {
        id
        author {
          username
        }
        text
        timestamp
      }
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation gqlCommentMutation($polishId: String!, $text: String!) {
    createComment(polishId: $polishId, text: $text) {
      text
      timestamp
      author {
        username
      }
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation gqlDeleteCommentMutation($commentId: ID!) {
    deleteComment(id: $commentId) {
      id
    }
  }
`;
