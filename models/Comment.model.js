// models/Comment.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new mongoose.Schema({
    comment:{ type:String, required:true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    articleId:{ type: Schema.Types.ObjectId, ref: "Article" }
}, {timestamps:true});

module.exports = model("Comment", commentSchema)