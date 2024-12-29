const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Can not get profile " + error.message);
  }
};

module.exports = userAuth;
