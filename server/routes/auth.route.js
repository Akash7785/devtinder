const express = require("express");
const authRouter = express.Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

// REGISTER A USER
authRouter.post("/signup", async (req, res) => {
  try {
    // validateSignUpData(req);
    const { firstName, lastName, email, password, age, photoUrl, skills } =
      req?.body;
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
        gender,
        photoUrl,
        skills,
      });
      const savedUser = await createdUser.save();
      // res.cookie("token", token, {
      //   expires: new Date(Date.now() + 8 * 3600000),
      // });

      res.json({ message: "User Added successfully!", data: savedUser });
    });
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
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send(error.message);
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
