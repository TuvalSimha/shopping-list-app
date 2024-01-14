export const typeDefinitions = /* GraphQL */ `
  type Query {
    lists: [List!]!
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    createList(name: String!): List!
    deleteList(id: ID!): List
    updateList(id: ID!, name: String!): List
    createItemOnList(listId: ID!, name: String!): Item!
    deleteItem(id: ID!): Item
    updateItem(id: ID!, name: String!): Item
  }

  type List {
    id: ID!
    description: String
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
