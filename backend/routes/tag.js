const express = require("express");
const router = express.Router();
const authToken = require('../middleware/authToken');
const {
  createTag,
  getTags,
  getFollowedTags,
  followTag
}= require('../controllers/tag');

router.post('/tag/create',createTag);
router.get('/tag/all',getTags);
router.get('/tag/follow',authToken,getFollowedTags);
router.get(`/tag/:tagId`,authToken,followTag);

module.exports = router;
