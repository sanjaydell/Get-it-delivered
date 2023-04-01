const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const Order = require("./models/Order");

const typeDefs = gql`
  type Order {
    id: ID!
    createdAt: String!
  }
  type Query {
    getOrders: [Order]
  }
`;
const resolvers = {
  Query: {
    async getOrders() {
      try {
        const orders = await Order.find();
        return orders;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to Db");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server running at ${res.server}`);
  });
