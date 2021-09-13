const express = require("express");
const router = express.Router();

const {
  createTag,
  getTags
}= require('../controllers/tag');

router.post('/tag/create',createTag);
router.get('/tag/all',getTags);

module.exports = router;
