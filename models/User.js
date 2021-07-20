const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    createdAt: String,
  },
  {
    collection: "userdata",
  }
);


module.exports = model('userdata', userSchema)