const { model, Schema } = require("mongoose");
const { UserRole, UserStatus } = require("../helper/constant");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    role: { type: String, default: UserRole.ADMIN, required: true },
    avatar: { type: String },
    status: { type: String, default: UserStatus.OFFLINE, required: true },
  },
  { timestamps: true }
);

let User = new model("User", UserSchema);
module.exports = User;
