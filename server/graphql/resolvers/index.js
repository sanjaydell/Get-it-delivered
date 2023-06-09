const orderResolvers = require("./orders");
const userResolvers = require("./users");

module.exports = {
  Query: {
    ...orderResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
