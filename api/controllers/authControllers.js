const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

exports.register = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).json({
      status: "FAILURE",
      message: "Enter all fields.",
    });
  } else {
    if (await User.findOne({ email: req.body.email })) {
      res.status(403).json({
        status: "FAILURE",
        message: "User with this email already exists",
      });
    } else {
      try {
        const savedUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        await savedUser.save();
        res.status(200).json({
          status: "SUCCESS",
          data: savedUser,
        });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }
};

// LOGING IN THE USER
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  // VERY VERY IMPORTANT
  // set 'select: false' in password field in Schema so taht password will not be exposed everytime whenever we query a document.
  //You will explecitly need to select passwod while loging in by usling .select method.

  const loggedIn = user && (await user.matchPassword(req.body.password));
  const token = signToken(user._id);

  if (loggedIn) {
    res.status(200).json({
      status: "SUCCESS",
      token: token,
    });
  } else {
    res.status(203).json({
      status: "FAIL",
      message: "User not found",
    });
  }
};
