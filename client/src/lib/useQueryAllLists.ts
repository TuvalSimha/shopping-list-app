import { graphql } from "@/gql";
import { useQuery } from "urql";

type allListsVariables = {
  status?: string;
};

export function useQueryAllLists(variables: allListsVariables) {
  const [{ data, fetching, error }] = useQuery({
    query: allLists,
    variables: {
      status: variables.status || undefined,
    },
  });

  return { data, fetching, error };
}

export const allLists = graphql(/* GraphQL */ `
  query allLists($status: String) {
    lists(status: $status) {
      id
      description
      name
      tag
      createdAt
      status
      items {
        id
        name
        description
        createdAt
        status
        listId
        price
        quantity
      }
    }
  }
`);
