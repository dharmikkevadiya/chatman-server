const { model, Schema } = require("mongoose");

const ErrorLogSchema = new Schema({
  apiPath: { type: String },
  message: { type: String },
  statusCode: { type: Number },
  data: { type: Object },
  createdAt: { type: Date, default: Date.now(), required: true, index: true },
});

let ErrorLog = new model("ErrorLog", ErrorLogSchema);
module.exports = ErrorLog;
