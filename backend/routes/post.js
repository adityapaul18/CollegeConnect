const express = require("express");
const router = express.Router();
const authToken = require('../middleware/authToken');
const {
  createPost,
  addAnswer,
  addComment,
  getAllPosts,
  getSinglePost,
  getUserPosts,
  getFeed
}= require('../controllers/post');
const multer = require('multer');
const upload=multer({storage: multer.memoryStorage()})

router.post('/question',authToken,upload.array('images'),createPost);
router.put('/answer/:postId',authToken,upload.array('images'),addAnswer);
router.put('/comment',authToken, addComment);
router.get('/post/all',getAllPosts);
router.get('/post/single/:postId',getSinglePost);
router.get('/post/user/:userId',getUserPosts);
router.get('/feed',authToken,getFeed);

module.exports = router;