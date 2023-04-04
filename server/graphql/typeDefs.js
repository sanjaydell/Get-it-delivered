const gql = require("graphql-tag");

module.exports = gql`
  type Order {
    id: ID!
    createdAt: String!
  }
  type Users {
    firstName: String!
    lastName: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
  }
  input Address {
    addressLine1: String!
    addressLine2: String!
    city: String!
    state: String!
    pinCode: String!
  }
  input RegisterInput {
    password: String!
    confirmPassword: String!
    email: String!
    firstName: String!
    lastName: String!
    mobile: String!
    address: Address!
  }
  type Query {
    getOrders: [Order]
    getUsers: [Users]
    login(email: String, password: String): User!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
