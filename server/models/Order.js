const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  orderid: String,
  userId: String,
  restaurantId: String,
  foodId: String,
  createdAt: String,
})

module.exports = model("Order", orderSchema);

