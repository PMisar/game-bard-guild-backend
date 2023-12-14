// routes/favoriteArticles.routes.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/Article.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /api/articles/:articleId/favorite - Add article to favorites
router.post("/articles/:articleId/favorite", isAuthenticated, (req, res) => {
  const { articleId } = req.params;
  const userId = req.payload._id;

  Article.findByIdAndUpdate(
    articleId,
    { $addToSet: { favorites: userId } },
    { new: true }
  )
    .then((updatedArticle) => {
        res.json(updatedArticle);
    })
    .catch((error) => res.status(500).json(error));
});

// DELETE /api/articles/:articleId/favorite - Remove article from favorites
router.delete("/articles/:articleId/favorite", isAuthenticated, (req, res) => {
  const { articleId } = req.params;
  const userId = req.payload._id;

  Article.findByIdAndUpdate(
    articleId,
    { $pull: { favorites: userId } },
    { new: true }
  )
  .then((updatedArticle) => {
    res.json(updatedArticle);
  })
  .catch((error) => res.status(500).json(error));
});

module.exports = router;
