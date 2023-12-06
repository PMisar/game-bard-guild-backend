// models/Comment.model.js

const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    comment:{ type:String, required:true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    articleId:{ type: Schema.Types.ObjectId, ref: "Article" }
},{timestamps:true})

module.exports=mongoose.model("Comment", CommentSchema)