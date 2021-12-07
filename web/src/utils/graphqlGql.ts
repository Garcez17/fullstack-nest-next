import gql from "graphql-tag";

export const GET_MESSAGES = gql`
  query {
    getMessages {
      id
      content
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_MESSAGES_FROM_USER = gql`
  query($user_id: String!) {
    getMessagesFromUser(user_id: $user_id) {
      id
      content
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($content: String!, $authorId: Float!) {
    createMessage(input: { content: $content, authorId: $authorId }) {
      id
      content
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageAdded {
      messageAdded {
      id
      authorId
      content
      user {
        id
        email
        name
      }
    }
  }
`;