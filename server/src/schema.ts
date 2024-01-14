import { makeExecutableSchema } from "@graphql-tools/schema";

type List = {
  id: string;
  description: string;
};

// 2
const lists: List[] = [
  {
    id: "link-0",
    description: "The easiest way of setting up a GraphQL server",
  },
];

const typeDefinitions = /* GraphQL */ `
  type Query {
    feed: [List!]!
  }

  type Mutation {
    createList(id: ID!, description: String!): List!
  }

  type List {
    id: ID!
    description: String!
  }
`;

const resolvers = {
  Query: {
    feed: () => lists,
  },
  List: {
    id: (parent: List) => parent.id,
    description: (parent: List) => parent.description,
  },
  Mutation: {
    createList: (
      parent: unknown,
      args: { id: string; description: string }
    ) => {
      // 1
      let idCount = lists.length;

      // 2
      const list: List = {
        id: `list-${idCount}`,
        description: args.description,
      };

      lists.push(list);

      return list;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
