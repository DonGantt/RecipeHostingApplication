const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({likes: -1});
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCreatePost: async (req, res) =>{
    res.render("createpost.ejs",{
      title: "Grandma's Cookbook -- Post A Recipe", 
      user: req.user,
      isEdit: false

    })
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
  getEditPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("createpost.ejs", {post: post, user: req.user, isEdit: true})
    } catch (err) {
      console.log(err)
    }
  },
  getSortedFeed: async (req, res) => {
    try {
      const posts = await Post.find({ recipeCategory: req.params.category }).sort({ likes: -1 }).lean();
      res.render("sortedpost.ejs", { posts: posts, user: req.user, category: req.params.category});
    } catch (err) {
      console.log(err);
    }
  },
  getRandomPost: async (req, res) => {
    try {
      const [post] = await Post.aggregate([{ $sample: { size: 1 } }])
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {

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
    //Convert back to findOneAndUpdate
    try {
      await Post.findByIdAndUpdate(req.params.id, {
        $inc: { likes: 1 },
        
        $push: { "likedUsers": req.user.id } 
      })
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },  
  unlikePost: async (req, res) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, {
        $inc: { likes: -1 },
        
        $pull: { "likedUsers": req.user.id } 
      })
        
      //   { _id: req.params.id },
      //   {
      //     $inc: { likes: 1 },
      //   },
      //   {
      //     likedUsers: likedUsers.push(req.user)
      //   }
      // );
      console.log("Likes -1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },  
  editPost: async (req, res) => {
    try {

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


      const updatePost = await Post.findById(req.params.id)

      if(req.body.recipeName.trim() !== null && req.body.recipeName.trim() !== undefined && req.body.recipeName.trim() !== ""){
        updatePost.recipeName = req.body.recipeName.trim();
      }
      if(req.body.recipeDescription.trim() !== null && req.body.recipeDescription.trim() !== undefined && req.body.recipeDescription.trim() !== ""){
        updatePost.description = req.body.recipeDescription.trim();
      }
      if(directions !== null && directions.length !== 0){
        updatePost.recipeDirections = directions;
      }
      if(ingredients !== null && ingredients.length !== 0){
        updatePost.recipeIngredients = ingredients;
      }
      if(req.body.recipeCategory !== null && req.body.recipeCategory !== undefined &&req.body.recipeCategory !== ""){
        updatePost.recipeCategory = req.body.recipeCategory;
      }
      
      updatePost.save()

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
