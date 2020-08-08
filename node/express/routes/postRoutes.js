const express = require("express");
const { getPosts, createPost } = require("../controllers/postController");
const { requireSignin } = require("../controllers/userController");
const { userById } = require("../controllers/userUpdateProfile");
const validation = require("../Validators");
const router = express.Router();

router.get("/", getPosts);

// hhere I want to change token validation to get post method to create post method
// router.post("/post", requireSignin, validation.createPostValidator, createPost);
router.post(
  "/post/by/:userId",
  requireSignin,
  createPost,
  validation.createPostValidator
);

router.param("userId", userById);

module.exports = router;
