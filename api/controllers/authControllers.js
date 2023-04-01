const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  const password = req.body.password;
  const hashedPassWord = await bcrypt.hash(password, 12);
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
          password: hashedPassWord,
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

// FINDING A USER BY USERNAME
exports.getUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log(req.body.email);
    res.status(200).json({
      status: "SUCCESS",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "FAILURE",
      error: error,
    });
  }
};
