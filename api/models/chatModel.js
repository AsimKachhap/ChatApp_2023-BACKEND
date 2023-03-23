const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    latestChat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Chats", ChatModel);
