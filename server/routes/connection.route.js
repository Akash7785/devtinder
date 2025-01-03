const express = require("express");
const connectionRoute = express.Router();
const connectionRequest = require("../model/connection.model");
const userModel = require("../model/user.model");

// SENDING CONNECTION REQUEST
connectionRoute.post("/request/send/:status/:userId", async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;
    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status " + status);
    }

    const exectingConnectionRequest = await connectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (exectingConnectionRequest) {
      throw new Error("Connection Request Already Exists!!");
    }
    const findingToUserIdInDB = await userModel.findById({ _id: toUserId });
    console.log("findingToUserIdInDB", findingToUserIdInDB);
    if (!findingToUserIdInDB) {
      throw new Error("User not found");
    }

    const connection = await new connectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await connection.save();
    res.send("Connection send");
  } catch (err) {
    res.status(400).send("Somthing went wrong! " + err);
  }
});

// REVIEW CONNECTION REQUEST (ACCEPT OR REJECT CONNECTION REQUEST)

connectionRoute.post("/request/review/:status/:requestId", async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status");
    }
    const connectionRequestData = await connectionRequest.findOne({
      status: "interested",
      toUserId: loggedInUser,
      _id: requestId,
    });
    if (!connectionRequestData) {
      throw new Error("No new connection request");
    }
    connectionRequestData.status = status;
    const data = await connectionRequestData.save();
    res.status(200).json({ message: "Connection request " + status, data });
  } catch (error) {
    res.status(400).send("Error! " + error.message);
  }
});

module.exports = connectionRoute;
