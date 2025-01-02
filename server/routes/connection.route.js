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

module.exports = connectionRoute;
