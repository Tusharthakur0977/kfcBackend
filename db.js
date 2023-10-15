const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://franchise:franchise1234@franchise.nvzrqla.mongodb.net/franchise"
    )
    .then((data) => {
      console.log(
        `MongoDB connected with server successfully at ${data.connection.host}`
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = connectDatabase;
