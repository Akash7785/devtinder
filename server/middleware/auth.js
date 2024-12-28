const adminAuth = (req, res, next) => {
  console.log("Middleware is running");
  const token = "yz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("You are not authorized"); //401 is for unauthorized
  } else {
    next();
  }
};

module.exports = adminAuth;
