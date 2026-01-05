import { gql } from "@apollo/client";

export const CREATE_BOOKS = gql`
  mutation CreateBook($title: String!, $description: String!) {
    createBook(input: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;