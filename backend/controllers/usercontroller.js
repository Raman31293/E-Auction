// import bcryptjs for password hashing
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/usermodels");

// user registration
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send("added sucessfuly");
  } catch (error) {
    console.error(error);
    res.send("Server Error");
  }
}

// user login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // check for user exists or not
    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }
    // check for hashed pass
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
      // Send the token back to the client
    res.status(200).json({ message: " Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { registerUser, loginUser };