const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinder:devTinderPass@cluster0.jpzk9.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
