import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "server/src/type-definitions.ts",
  documents: ["**/*.tsx", "**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./client/src/gql/": {
      preset: "client",
    },
  },
};

export default config;
