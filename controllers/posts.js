const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({likes: -1});
      console.log(req.user)
      console.log(posts)
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCreatePost: async (req, res) =>{
    res.render("createpost.ejs",{
      title: "Grandma's Cookbook -- Post A Recipe", 
      user: req.user
    })
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ likes: -1 }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post)
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getSortedFeed: async (req, res) => {
    try {
      const posts = await Post.find({ recipeCategory: req.params.category }).sort({ likes: -1 }).lean();
      console.log(posts)
      res.render("sortedpost.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getRandomPost: async (req, res) => {
    try {
      console.log("hit")
      const [post] = await Post.aggregate([{ $sample: { size: 1 } }])

      console.log(post)

      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {

      console.log(req.body)
      let directions, ingredients;
      
      !Array.isArray(req.body.recipeDirection) ? directions = [req.body.recipeDirection] : directions = req.body.recipeDirection;
    
      !Array.isArray(req.body.recipeIngredient) ? ingredients = [req.body.recipeIngredient] : ingredients = req.body.recipeIngredient;

      directions = directions.filter(elem => {
        if(elem!= undefined || elem != null ){
          elem = elem.trim();
          if(elem != ""){
            return elem
          }
        }
      })

      
      ingredients = ingredients.filter(elem => {
        if(elem!= undefined || elem != null ){
          elem = elem.trim();
          if(elem != ""){
            return elem
          }
        }
      })


      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result)

      await Post.create({
        recipeName: req.body.recipeName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.recipeDescription,
        recipeDirections: directions,
        recipeIngredients: ingredients,
        recipeCategory: req.body.recipeCategory,
        likes: 0,
        user: req.user.id,
        userName: req.user.userName,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
