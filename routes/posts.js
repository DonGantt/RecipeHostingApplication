const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/createPost", ensureAuth, postsController.getCreatePost)

router.get("/random",  postsController.getRandomPost); 

router.get("/edit/:id", ensureAuth ,postsController.getEditPost);

router.get("/:id",  postsController.getPost); //Do I need to ensure auth?

router.get("/type/:category",  postsController.getSortedFeed); //Do I need to ensure auth?


router.post("/createPost", ensureAuth ,upload.single("file"), postsController.createPost);

router.put("/likePost/:id", ensureAuth ,postsController.likePost);

router.put("/unlikePost/:id", ensureAuth ,postsController.unlikePost);

router.put("/edit/:id", ensureAuth, postsController.editPost)

router.delete("/deletePost/:id", ensureAuth ,postsController.deletePost);

module.exports = router;
