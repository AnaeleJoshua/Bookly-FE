import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      description
    }
  }
`;



export const GET_BOOK = gql`
  query GetBook($id: Int!) {
    book(id: $id) {
      id
      title
      description
    }
  }
`;
