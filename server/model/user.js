const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  facebook: {
    type: Object,
    default: {
      status: false,
      id: "",
      profileImg: "",
      access_token: "",
      page: {
        id: "",
        name: "",
      },
      messages: {},
    },
  },
});

module.exports = mongoose.model("User", userSchema);
