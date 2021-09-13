const User = require("../models/user");
const shortid = require("shortid");
const path = require('path');
const {bucket} =require("../utils/admin");
const firebaseConfig = require("../utils/firebaseConfig");

exports.editProfile = async(req, res) => {
  try{
    if(req.user._id!=req.params.userId) return res.status(400).json({error:'Unauthorized Access'});
    let existingUser = await User.findById(req.params.userId);
    if(!existingUser) return res.status(400).json({error:'User does not exists'});
    let updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body,{new: true});
    res.status(200).json({
      message:'User profile updated successfully',
      updatedUser
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getAllProfiles = async(req, res) => {
  try{
    let users = await User.find().populate('tags');
    if(!users) return res.status(400).json({error:'No users found'});
    res.status(200).json({
      message:'Fetched user profiles successfully',
      users
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getSingleProfile = async(req, res) => {
  try{
    let { userId } = req.params;
    if(!userId) return res.status(400).json({error:'User ID is required'});

    let user = await User.findById(userId).populate('tags');
    if(!user) return res.status(400).json({error:'No user found'});
    res.status(200).json({
      message:'Fetched user profile successfully',
      user
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getCustomisedProfiles = async(req, res) => {
  try{
    let data = {};
    let user = await User.findById(req.user._id);
    if(!user) return res.status(400).json({error:'No user found'});
    if(user.tags.length!==0){
      data = { _id:{$ne: req.user._id},tags: { $in: user.tags} }
    }
    let users = await User.find(data).populate('tags');
    if(!users) return res.status(400).json({error:'No users found'});
    res.status(200).json({
      message:'Fetched customised profiles successfully',
      users
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.editProfileImage = async(req, res) => {
  try{

    let profilePicture;
    if(req.file){
     const fileName = shortid.generate() + path.extname(req.file.originalname);
     await bucket.file(fileName).createWriteStream().end(req.file.buffer);
     profilePicture=`https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${fileName}?alt=media`
   }
   let updatedUser = await User.findByIdAndUpdate(req.user._id,{profilePicture},{new: true});
   res.status(200).json({
     message: 'Updated profile image successfully',
     updatedUser
   })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.editCoverImage = async(req, res) => {
  try{
    let coverImage;
    if(req.file){
     const fileName = shortid.generate() + path.extname(req.file.originalname);
     await bucket.file(fileName).createWriteStream().end(req.file.buffer);
     coverImage=`https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${fileName}?alt=media`
   }
   let updatedUser = await User.findByIdAndUpdate(req.user._id,{coverImage},{new: true});
   res.status(200).json({
     message: 'Updated cover image successfully',
     updatedUser
   })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}
