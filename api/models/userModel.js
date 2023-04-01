const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      select: false,
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // if confirmPassword field is availablle, don't store in db: This can be done by
  // this.confirmPassword = undefined;

  next();
});

module.exports = mongoose.model("User", userSchema);
