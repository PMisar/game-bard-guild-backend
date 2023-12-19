// models/article.routes.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/Article.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require('../config/cloudinary.config');

// POST /api/articles - Creates a new article
router.post("/articles", isAuthenticated, fileUploader.single('image'), (req, res) => {
  const { title, description, tags, } = req.body;

  const userId = req.payload._id;

  Article.create({ title, description, tags, imageUrl: req.file.path, user: userId })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// GET /api/articles - Retrieves all articles
router.get("/articles", isAuthenticated, (req, res, next) => {

  Article.find()
    .sort({ createdAt: -1 })
    .populate("user", "name")
    .populate({
      path: "comments",
      populate: { path: "userId", select: "name" },
    })
    .then((allArticles) => {
      res.json(allArticles)
    })
    .catch((err) => res.json(err));
});

// GET /api/articles/:articleId - Retrieves a specific article by id
router.get("/articles/:articleId", (req, res, next) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Article.findById(articleId)
    .populate("user", "name")
    .populate({
      path: "comments",
      populate: { path: "userId", select: "name" },
    })
    .then((article) => res.status(200).json(article))
    .catch((error) => res.json(error));
});

// PUT /api/articles/:articleId - Updates a specific article by id
router.put("/articles/:articleId", isAuthenticated, (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .then((existingArticle) => {
      if (!existingArticle) {
        res.status(404).json({ message: "Article not found" });
        return;
      }

      const imageUrl = existingArticle.imageUrl || (req.file && req.file.path);

      // Update the article with the new data
      Article.findByIdAndUpdate(articleId, { ...req.body, imageUrl }, { new: true })
        .then((updatedArticle) => res.json(updatedArticle))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
});

// DELETE /api/articles/:articleId - Deletes a specific article by id
router.delete("/articles/:articleId", isAuthenticated, (req, res, next) => {
  const { articleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Article.findByIdAndRemove(articleId)
    .then(() =>
      res.json({
        message: `Article with ${articleId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

// Code for handling Like / Unlike

router.put('/articles/:articleId/like', isAuthenticated, (req, res) => {
  const { articleId } = req.params;
  Article.findByIdAndUpdate(
    articleId,
    { $push: { likes: req.payload._id } },
    { new: true }
  )
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/articles/:articleId/unlike", isAuthenticated, (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.payload._id;

  Article.findByIdAndUpdate(
    articleId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((updatedArticle) => {
      res.json(updatedArticle);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;