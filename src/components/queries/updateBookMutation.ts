import { gql } from "@apollo/client";

export const UPDATE_BOOKS = gql`
  mutation UpdateBook($id: Int!, $title: String!, $description: String!) {
    updateBook( id: $id,input: {  title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;