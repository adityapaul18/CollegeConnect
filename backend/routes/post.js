const express = require("express");
const router = express.Router();
const authToken = require('../middleware/authToken');
const {
  createPost,
  addAnswer,
  addComment
}= require('../controllers/post');
const multer = require('multer');
const upload=multer({storage: multer.memoryStorage()})

router.post('/question',authToken,upload.array('images'),createPost);
router.put('/answer/:postId',authToken,upload.array('images'),addAnswer);
router.put('/comment',authToken, addComment);

module.exports = router;