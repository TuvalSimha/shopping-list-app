export const typeDefinitions = /* GraphQL */ `
  type Query {
    lists(status: String): [List!]!
    list(id: String!): List
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    createList(name: String!, description: String, tag: String): List!
    deleteList(id: ID!): List
    updateList(id: ID!, name: String!): List
    createItemOnList(listId: ID!, name: String!): Item!
    deleteItem(id: ID!): Item
    updateItem(id: String!, name: String!): Item
  }

  type List {
    id: ID!
    description: String
    name: String!
    tag: String
    items: [Item!]!
    createdAt: String!
    status: String!
  }

  type Item {
    id: ID!
    name: String!
    listId: ID!
    quantity: Int!
    price: Float!
    description: String
    createdAt: String!
    status: String!
  }
`;
