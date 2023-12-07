// // routes/like.routes.js
// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const Like = require("../models/Like.model");
// const { isAuthenticated } = require("../middleware/jwt.middleware");

// // POST /api/articles/:articleId/likes - Creates a new like for a specific article
// router.post("/articles/:articleId/likes", isAuthenticated, (req, res, next) => {
//   const { articleId } = req.params;
//   const userId = req.payload._id;

//   Like.create({ userId, articleId })
//     .then((response) => res.status(201).json(response))
//     .catch((err) => res.status(500).json(err));
// });

// // DELETE /api/articles/:articleId/likes/:likeId - Deletes a specific like by ID
// router.delete("/articles/:articleId/likes/:likeId", isAuthenticated, (req, res, next) => {
//   const { likeId } = req.params;

//   Like.findByIdAndRemove(likeId)
//     .then(() => res.status(200).json({ message: `Like with ${likeId} is removed successfully.` }))
//     .catch((error) => res.status(500).json(error));
// });

// module.exports = router;