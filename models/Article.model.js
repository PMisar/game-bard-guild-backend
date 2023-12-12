// models/Article.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tags: { type: [String] },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = model("Article", articleSchema);