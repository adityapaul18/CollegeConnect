const express = require("express");
const router = express.Router();
const authToken = require('../middleware/authToken');
const {
  editProfile,
  getAllProfiles,
  getSingleProfile,
  getCustomisedProfiles,
  editProfileImage,
  editCoverImage,
  postFCM
}= require('../controllers/profile');
const multer = require('multer');
const upload=multer({storage: multer.memoryStorage()})
const fieldUploads=upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }])
router.put('/profile/:userId',authToken,fieldUploads,editProfile);
router.get('/profile/all',getAllProfiles);
router.get('/profile/single/:userId',getSingleProfile);
router.get('/profile/custom',authToken,getCustomisedProfiles);
router.put('/fcm',authToken,postFCM);
router.put('/profilePicture',authToken,upload.single('profilePicture'),editProfileImage);
router.put('/coverImage',authToken,upload.single('coverImage'),editCoverImage);

module.exports = router;
