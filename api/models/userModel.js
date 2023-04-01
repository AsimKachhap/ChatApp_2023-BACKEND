const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your userName."],
    },

    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true,
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
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
