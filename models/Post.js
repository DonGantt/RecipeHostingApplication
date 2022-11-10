const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    required: true
  },
  recipeDirections: {
    type: Array,
    required: true
  },
  recipeIngredients: {
    type: Array,
    required: true
  },
  recipeCategory:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likedUsers: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model("Post", PostSchema);
