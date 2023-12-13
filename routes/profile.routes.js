// routes/profile.routes.js

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const Article = require("../models/Article.model");

// Route to get user profile information, including profile picture
router.get("/profile", isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.payload)
    // USER SAVED IN PAYLOAD!
    const userId = req.payload._id;

    const user = await User.findById(userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const userArticles = await Article.find({ user: userId })
      .populate("user", "name")
      .populate({
        path: "comments",
        populate: { path: "userId", select: "name" },
      });

//     res.status(200).json({
//       _id: user._id,
//       email: user.email,
//       name: user.name,
//       profilePicture: user.profilePicture,
//       articles: userArticles,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

const responseData = {
  _id: user._id,
  email: user.email,
  name: user.name,
  profilePicture: user.profilePicture,
  articles: userArticles,
};

if (user.createdAt) {
  responseData.createdAt = user.createdAt;
}

res.status(200).json(responseData);
} catch (error) {
next(error);
}
});


// Route to delete the authenticated user
router.delete("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload;

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
