import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefinitions } from "./type-definitions";
import { resolvers } from "./resolvers";

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
