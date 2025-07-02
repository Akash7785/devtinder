const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies; // Extract token from cookies
    // const token  = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    // const token =req.headers["x-auth-token"]; // Extract token from custom header

    // If token is not present in cookies or headers, return 401 Unauthorized
    if (!token) {
      return res.status(401).send("Please login!");
    }
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Can not get profile " + error.message);
  }
};

module.exports = userAuth;
