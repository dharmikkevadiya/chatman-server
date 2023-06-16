const { model, Schema } = require("mongoose");

const ChatSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

let User = new model("Chat", ChatSchema);
module.exports = User;
