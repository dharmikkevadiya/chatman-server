const { MONGODB_URL } = require("../config");
const mongoose = require("mongoose");

//require models & connect to db
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfully with DB...");
  })
  .catch((err) => {
    console.log(err);
  });
