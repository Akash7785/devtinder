const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const User = require("./model/user.model");
const cookieparser = require("cookie-parser");
const userAuth = require("./middleware/auth");

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const userRoutes = require("./routes/user.route");
const connectionRoute = require("./routes/connection.route");

app.use("/", authRouter);
app.use("/", userAuth, connectionRoute);
app.use("/", userAuth, userRoutes);
app.use("/", userAuth, profileRoutes);

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
