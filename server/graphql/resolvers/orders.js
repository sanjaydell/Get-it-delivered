const Order = require("../../models/Order");

module.exports = {
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
}