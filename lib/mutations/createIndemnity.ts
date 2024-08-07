import { gql } from "@apollo/client";

export const createIndemnity = () => {
  return gql`
    mutation CREATE_INDEMNITY($data: IndemnityCreateInput!) {
      createIndemnity(data: $data) {
        id
        firstName
        lastName
        indemnityPdfUrl
        date
      }
    }
  `;
};
