const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./model/user.model");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const adminAuth = require("./middleware/auth");
const userAuth = require("./middleware/auth");

app.use(express.json());
app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/admin", adminAuth);

//DUMMY ROUTE
app.post("/admin/dashboard", (req, res) => {
  res.send("Admin Dashboard");
});

// REGISTER A NEW USER
app.post("/signup", async (req, res) => {
  try {
    // validateSignUpData(req);
    const { firstName, lastName, email, password, age } = req.body;
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
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req?.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatepassword(password);
    if (isPasswordValid) {
      // CREATING A COOKIE & JWT TOKEN FOR AUTHENTICATION
      const token = user.getJWT();
      res.cookie("token", token);
      res.status(200).send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Can not login user " + error.message);
  }
});

// GET ALL USERS
app.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Can not get users" + error.message);
  }
});

// UPDATE A USER
app.patch("/user/:id", async (req, res) => {
  const userId = req.params?.id;
  const data = req.body;
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
    // if (ALLOWED_UPDATES.skills.lenght > 10) {
    //   throw new Error("Skills can not be more than 10");
    // }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
      // returnDocument: "after",
      new: true,
    });
    // if (!updatedUser) {
    //   res.send("User not found.");
    // }
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send("can not update " + error.message);
  }
});

// DELETE A USER
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Can not delete user" + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Can not get profile" + error.message);
  }
});

app.use("/", (req, res) => {
  res.send("404 Page not found");
});

//To connect to the database
connectDB()
  .then(() => {
    console.log("Connected to db");
    app.listen(7777, () => {
      console.log("App is listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Db can not be connected", err);
  });
