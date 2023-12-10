// routes/profile.routes.js

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

// Route to get user profile information, including profile picture
router.get("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    next(error);
  }
});

// Route to delete the authenticated user
router.delete("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
