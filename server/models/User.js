const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  userName: String,
  password: String,
  Email: String,
  firstName: String,
  lastName: String,
  mobile: String,
  address: Object,
  userId: String,
});

module.exports = model("User", userSchema);
