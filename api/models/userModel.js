const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your userName."],
    },

    email: {
      type: String,
      required: [true, "Please enter your email."],
    },

    password: {
      type: String,
      required: [true, "Please enter your Password."],
    },

    displayPicture: {
      type: String,
      required: true,
      default: "https://cdn-icons-png.flaticon.com/512/552/552721.png",
    },
  },
  {
    timeStamps: true,
  }
);
