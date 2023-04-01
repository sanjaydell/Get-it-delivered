const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  password: String,
  confirmPassword: String,
  email: String,
  firstName: String,
  lastName: String,
  mobile: String,
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pinCode: String,
  },
  createdAt: String,
});

module.exports = model("User", userSchema);
