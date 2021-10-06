const express = require("express");
const router = express.Router();
const authToken = require('../middleware/authToken');
const {
  createPost
}= require('../controllers/post');
const multer = require('multer');
const upload=multer({storage: multer.memoryStorage()})

router.post('/question',authToken,upload.array('images'),createPost);

module.exports = router;