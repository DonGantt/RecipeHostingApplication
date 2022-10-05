const Post = require("../models/Post");


module.exports = {
    getHomePage: async (req, res) => {
        
        try {
            const posts = await Post.find().sort({ likes: -1 }).lean();
            res.render("home.ejs", { 
                title: "Grandma's Cookbook -- Home",
                user: req.user,
                posts: posts });
          } catch (err) {
            console.log(err);
          }
        
    }
}