const User = require("../models/user");
const Tag = require("../models/tag");
const Post = require("../models/post");
const shortid = require("shortid");
const path = require('path');
const {bucket} =require("../utils/admin");
const firebaseConfig = require("../utils/firebaseConfig");

exports.createPost = async(req, res) => {
  try{

    let { title, description, tags } = req.body;
    if(!title) return res.status(400).json({error:'Post title cannot be empty'});
    if(req.files){
      var imageArray= req.files.map((f)=>{
         var fileName =shortid.generate() + path.extname(f.originalname);
          bucket.file(fileName).createWriteStream().end(f.buffer)
            const url = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${fileName}?alt=media`;
            return url;
        });
        req.body.images=imageArray;
    }
    req.body.user = req.user._id;
    post = {
      question: req.body
    };
     let newPost = await new Post(post).save();
     res.status(200).json({
       message: 'New post created',
       newPost
     })    
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

