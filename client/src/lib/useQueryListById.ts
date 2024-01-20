import { graphql } from "@/gql";
import { useQuery } from "urql";

type allListsVariables = {
  id: string;
};

export function useQueryListById({ id }: allListsVariables) {
  const [{ data, fetching, error }] = useQuery({
    query: listById,
    variables: {
      id,
    },
  });

  return { data, fetching, error };
}

export const listById = graphql(/* GraphQL */ `
  query listById($id: String!) {
    list(id: $id) {
      id
      description
      name
      tag
      createdAt
      status
      items {
        id
        name
        listId
        quantity
        price
        description
        createdAt
        status
      }
    }
  }
`);
