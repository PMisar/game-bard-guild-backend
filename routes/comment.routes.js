// routes/comment.routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /api/comments - Creates a new comment
router.post("/comments", isAuthenticated, (req, res, next) => {
  const { comment, articleId } = req.body;
  const userId = req.payload._id; 

  Comment.create({ comment, userId, articleId })
    .then((response) => res.status(201).json(response))
    .catch((err) => res.status(500).json(err));
});

// GET /api/comments - Retrieves all comments
router.get("/comments", (req, res, next) => {
  Comment.find()
    .populate("userId", "name")
    .then((allComments) => res.status(200).json(allComments))
    .catch((err) => res.status(500).json(err));
});

// GET /api/comments/:commentId - Retrieves a specific comment by ID
router.get("/comments/:commentId", (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.findById(commentId)
    .populate("userId", "name")
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(500).json(error));
});

// PUT /api/comments/:commentId - Updates a specific comment by ID
router.put("/comments/:commentId", isAuthenticated, (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.findByIdAndUpdate(commentId, req.body, { new: true })
    .then((updatedComment) => res.status(200).json(updatedComment))
    .catch((error) => res.status(500).json(error));
});

// DELETE /api/comments/:commentId - Deletes a specific comment by ID
router.delete("/comments/:commentId", isAuthenticated, (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.findByIdAndRemove(commentId)
    .then(() =>
      res.status(200).json({
        message: `Comment with ${commentId} is removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));
});

module.exports = router;