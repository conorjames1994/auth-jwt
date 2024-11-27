const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/jwt");

const UserSchema = mongoose.Schema({
  username: String,
  password: String
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;