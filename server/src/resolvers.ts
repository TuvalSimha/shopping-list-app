import type { List, Item } from "@prisma/client";
import type { GraphQLContext } from "./context";

export const resolvers = {
  Query: {
    async lists(
      parent: unknown,
      args: { status?: string },
      context: GraphQLContext
    ) {
      const where = args.status
        ? {
            status: args.status,
          }
        : {};

      return context.prisma.list.findMany({
        where,
      });
    },
    async list(parent: unknown, args: { id: string }, context: GraphQLContext) {
      return context.prisma.list.findUnique({
        where: { id: parseInt(args.id) },
      });
    },
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
    status: (parent: List) => parent.status,
  },
  Item: {
    id: (parent: Item) => parent.id,
    name: (parent: Item) => parent.name,
    listId: (parent: Item) => parent.listId,
    quantity: (parent: Item) => parent.quantity,
    price: (parent: Item) => parent.price,
    description: (parent: Item) => parent.description,
    createdAt: (parent: Item) => parent.createdAt,
    status: (parent: Item) => parent.itemStatus,
  },
  Mutation: {
    async createList(
      parent: unknown,
      args: { name: string; description: string; tag: string },
      context: GraphQLContext
    ) {
      const newList = await context.prisma.list.create({
        data: {
          name: args.name,
          description: args.description,
          tag: args.tag,
        },
      });
      return newList;
    },
    async deleteList(
      parent: unknown,
      args: { id: string },
      context: GraphQLContext
    ) {
      const deletedList = await context.prisma.list.delete({
        where: { id: parseInt(args.id) },
      });
      return deletedList;
    },
    async updateList(
      parent: unknown,
      args: { id: string; description: string },
      context: GraphQLContext
    ) {
      const updatedList = await context.prisma.list.update({
        where: { id: parseInt(args.id) },
        data: { description: args.description },
      });
      return updatedList;
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
    async updateItem(
      parent: unknown,
      args: { id: string; name: string },
      context: GraphQLContext
    ) {
      const updatedItem = await context.prisma.item.update({
        where: { id: parseInt(args.id) },
        data: { name: args.name },
      });
      return updatedItem;
    },
  },
};
