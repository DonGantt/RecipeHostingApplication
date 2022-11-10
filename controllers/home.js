const Post = require("../models/Post");


module.exports = {
    getHomePage: async (req, res) => {
        
        try {
            const randomPost = await Post.aggregate([ { $sample: { size: 4 } } ])
            const posts = await Post.find().sort({ likes: -1 }).lean();
            
            console.log(randomPost, posts)
            res.render("home.ejs", { 
                title: "Grandma's Cookbook -- Home",
                user: req.user,
                posts: posts,
                randomPosts: randomPost,
             });
          } catch (err) {
            console.log(err);
          }
        
    }
}