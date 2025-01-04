const express = require("express");
const userRouter = express.Router();
const User = require("../model/user.model");
const userAuth = require("../middleware/auth");
const connectionRequest = require("../model/connection.model");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// GET ALL USERS
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Can not get users" + error.message);
  }
});

// All RECIEVED REQUESTS
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
