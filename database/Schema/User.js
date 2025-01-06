const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
// id, username, first_name
module.exports = User;
