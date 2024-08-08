import { gql } from "@apollo/client";

export const getIndemnityText = () => {
  return gql`
    query GetIndemnity {
      indemnityFormText {
        content {
          document
        }
      }
    }
  `;
};
