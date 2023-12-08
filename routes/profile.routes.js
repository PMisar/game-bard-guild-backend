// routes/user.routes.js

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

// Route to get user profile information
router.get("/profile", isAuthenticated, async (req, res, next) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.id;

    // Fetch user information based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user profile information
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
