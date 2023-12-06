// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
}, { timestamps: true });

module.exports = model("User", userSchema);