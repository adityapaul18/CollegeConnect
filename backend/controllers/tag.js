const Tag = require('../models/tag');

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
