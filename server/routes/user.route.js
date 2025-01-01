const express = require("express");
const userRouter = express.Router();
const User = require("../model/user.model");
const userAuth = require("../middleware/auth");

// GET ALL USERS
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Can not get users" + error.message);
  }
});

module.exports = userRouter;
