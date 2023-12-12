// models/article.routes.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/Article.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require('../config/cloudinary.config');
// OLD CODE
// // POST /api/articles - Creates a new article
// router.post("/articles", isAuthenticated, (req, res, next) => {
//   const { title, description, tags, image } = req.body;
//   const userId = req.payload._id;

//   Article.create({ title, description, tags, image, user: userId })
//     .then((response) => res.json(response))
//     .catch((err) => res.json(err));
// });

// ADDING IMAGE TEST CODE
// POST /api/articles - Creates a new article
router.post("/articles", isAuthenticated, fileUploader.single('game-image'), (req, res, next) => {
  const { title, description, tags, } = req.body;
  const userId = req.payload._id;

  Article.create({ title, description, tags, imageUrl: req.file.path, user: userId })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// GET /api/articles - Retrieves all articles
router.get("/articles", isAuthenticated, (req, res, next) => {

  Article.find()
    .populate("user", "name")
    .populate({
      path: "comments",
      populate: { path: "userId", select: "name" },
    })
    .then((allArticles) => res.json(allArticles))
    .catch((err) => res.json(err));
});

// router.get("/articles", isAuthenticated, (req, res, next) => {
//   const userId = req.payload._id;

//   Article.find({ user: userId })
//     .populate("user", "name")
//     .populate({
//       path: "comments",
//       populate: { path: "userId", select: "name" },
//     })
//     .then((userArticles) => res.json(userArticles))
//     .catch((err) => res.json(err));
// });

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

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Article.findByIdAndUpdate(articleId, req.body, { new: true })
    .then((updatedArticle) => res.json(updatedArticle))
    .catch((error) => res.json(error));
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

// LIKES, UNLIKES
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

router.delete("/articles/:articleId/unlike", isAuthenticated, (req, res, next) => {
  const { articleId } = req.params;
  console.log(articleId)
  const userId = req.payload._id;

  Article.findByIdAndUpdate(
    articleId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((updatedArticle) => {
      console.log(`Article removed from likes.`);
      res.json(updatedArticle);
    })
    .catch((error) => res.status(500).json(error));
});

module.exports = router;