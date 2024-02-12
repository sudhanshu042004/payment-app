require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);
const Account = mongoose.model("account", AccountSchema);

module.exports = {
  User,
  Account,
};
