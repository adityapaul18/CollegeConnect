const Tag = require('../models/tag');
const User = require('../models/user');

exports.createTag = async(req, res) => {
  try{
    let { name } =req.body;
    if(!name||name=="") return res.status(400).json({error:'Tag name is required'});

    let newTag = await new Tag(req.body).save();
    res.status(200).json({
      message:'Tag created successfully',
      tag: newTag
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getTags = async(req, res) => {
  try{
    let tags = await Tag.find();
    if(!tags) return res.status(400).json({error:'No tags found!'});
    res.status(200).json({
      message:'Tags fetched successfully',
      tags
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getFollowedTags = async(req,res) => {
  try{
    let existingUser = await User.findById(req.user._id).populate('tags');
    res.status(200).json({
      message:'Fetched followed tags successfully',
      tags:existingUser.tags
    })

  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.followTag = async(req, res) => {
  try{
    let {tagId} = req.params;
    let existingUser = await User.findById(req.user._id);
    existingUser.tags.push(tagId);
    await existingUser.save();
    res.status(200).json({
      message: 'You are following this tag'
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}
