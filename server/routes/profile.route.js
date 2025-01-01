const express = require("express");
const profileRouter = express.Router();
const User = require("../model/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");

// GET USER PROFILE
profileRouter.get("/profile/view", async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Can not get profile" + error.message);
  }
});

// UPDATE A USER
profileRouter.patch("/profile/edit", async (req, res) => {
  const userId = req?.user._id;
  console.log("req.user", req.user);
  const data = req?.body;
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "password",
      "photoUrl",
      "about",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Invalid updates");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
      new: true,
    });

    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send("can not update " + error.message);
  }
});

// DELETE A USER
profileRouter.delete("/profile/delete", async (req, res) => {
  try {
    const userId = req?.user._id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Can not delete user" + error.message);
  }
});

// UPDATE PASSWORD
profileRouter.patch("/profile/update-password", async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const user = req.user;
    if (validator.isStrongPassword(currentPassword)) {
      const newPassword = await bcrypt.hash(currentPassword, 10);
      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { password: newPassword }
      );
      await updatedUser.save();
      res.status(200).send("Password changed successfully");
    } else {
      throw new Error("Please Login first");
    }
  } catch (error) {
    res.status(400).send("Can not change password" + error.message);
  }
});

module.exports = profileRouter;
