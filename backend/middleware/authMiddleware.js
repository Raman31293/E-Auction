const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user data to the request object
    req.userData = decodedToken;
    // Call next middleware
    next();
  } catch (error) {
    // If token verification fails, send 401 Unauthorized response
    return res.status(401).json({ message: "Authentication failed" });
  }
};