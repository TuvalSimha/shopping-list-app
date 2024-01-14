import { makeExecutableSchema } from "@graphql-tools/schema";
import type { List, Item } from "@prisma/client";
import type { GraphQLContext } from "./context";

const typeDefinitions = /* GraphQL */ `
  type Query {
    lists: [List!]!
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    createList(description: String!): List!
    createItemOnList(listId: ID!, name: String!): Item!
    deleteItem(id: ID!): Item
  }

  type List {
    id: ID!
    description: String!
    name: String!
    tag: String
    items: [Item!]!
    createdAt: String!
  }

  type Item {
    id: ID!
    name: String!
    listId: ID!
    quantity: Int!
    price: Float!
    description: String
    createdAt: String!
    status: Status
  }

  enum Status {
    ACTIVE
    BOUGHT
  }
`;

const resolvers = {
  Query: {
    lists: (parent: unknown, args: {}, context: GraphQLContext) =>
      context.prisma.list.findMany(),
    items: (parent: unknown, args: {}, context: GraphQLContext) =>
      context.prisma.item.findMany(),
    item: (parent: unknown, args: { id: string }, context: GraphQLContext) =>
      context.prisma.item.findUnique({
        where: { id: parseInt(args.id) },
      }),
  },
  List: {
    id: (parent: List) => parent.id,
    description: (parent: List) => parent.description,
    items: (parent: List, args: {}, context: GraphQLContext) =>
      context.prisma.item.findMany({
        where: { listId: parent.id },
      }),
    createdAt: (parent: List) => parent.createdAt,
    name: (parent: List) => parent.name,
    tag: (parent: List) => parent.tag,
  },
  Item: {
    id: (parent: Item) => parent.id,
    name: (parent: Item) => parent.name,
    listId: (parent: Item) => parent.listId,
    quantity: (parent: Item) => parent.quantity,
    price: (parent: Item) => parent.price,
    description: (parent: Item) => parent.description,
    createdAt: (parent: Item) => parent.createdAt,
    status: (parent: Item) => parent.status,
  },
  Mutation: {
    async createList(
      parent: unknown,
      args: { description: string },
      context: GraphQLContext
    ) {
      const newList = await context.prisma.list.create({
        data: {
          description: args.description,
        },
      });
      return newList;
    },
    async createItemOnList(
      parent: unknown,
      args: { listId: string; name: string },
      context: GraphQLContext
    ) {
      const newItem = await context.prisma.item.create({
        data: {
          listId: parseInt(args.listId),
          name: args.name,
        },
      });
      return newItem;
    },
    async deleteItem(
      parent: unknown,
      args: { id: string },
      context: GraphQLContext
    ) {
      const deletedItem = await context.prisma.item.delete({
        where: { id: parseInt(args.id) },
      });
      return deletedItem;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
