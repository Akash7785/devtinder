const express = require("express");
const authRouter = express.Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

// REGISTER A USER
authRouter.post("/signup", async (req, res) => {
  try {
    // validateSignUpData(req);
    const { firstName, lastName, email, password, age } = req?.body;
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("User already exists");
    }

    bcrypt.hash(password, 10, async function (err, hashPassword) {
      if (err) {
        throw new Error("Can not hash password");
      }
      const createdUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        age,
      });
      await createdUser.save();
    });
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(400).send("Can not register user" + error.message);
  }
});

// LOGIN A USER
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req?.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatepassword(password);
    if (isPasswordValid) {
      // CREATING A COOKIE & JWT TOKEN FOR AUTHENTICATION
      const token = await user.getJWT();
      console.log("token", token);
      res.cookie("token", token);
      res.status(200).send("Login successful");
      res.json({ msg: "Login successful" });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Can not login user " + error.message);
  }
});

//LOGOUT A USER
authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logout successful");
  } catch (error) {
    res.status(400).send("Can not logout user " + error.message);
  }
});

module.exports = authRouter;
