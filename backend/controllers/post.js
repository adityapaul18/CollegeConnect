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
    if(!title||title=="") return res.status(400).json({error:'Post title cannot be empty'});
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

exports.addAnswer = async(req, res) => {
  try{
    let { postId } = req.params;
    let { description } = req.body;
    if(!postId) return res.status(400).json({error:'Post Id is required'});
    if(!description||description=="") return res.status(400).json({error:'Answer description cannot be empty'});
    let existingPost = await Post.findById(postId);
    if(!existingPost) return res.status(400).json({error:'Post not found!'});
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
    await existingPost.answer.push(req.body);
    await existingPost.save();

     res.status(200).json({
       message: 'Answer added to post successfully',
       existingPost
     })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.addComment = async(req, res) => {
  try{
    let { postId, answerId, comment } = req.body;
    if(!postId) return res.status(400).json({error:'Post Id is required'});
    if(!answerId) return res.status(400).json({error:'Answer Id is required'});
    if(!comment||comment=="") return res.status(400).json({error:'Comment cannot be empty'});
    let existingPost = await Post.findById(postId);
    if(!existingPost) return res.status(400).json({error:'Post not found!'});
    await existingPost.answer.map((a,i)=>{
      if(a._id==answerId){
        a.comments.push({comment,user:req.user._id})
      }
    })
    await existingPost.save();

     res.status(200).json({
       message: 'Comment added to answer successfully',
       existingPost
     })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getAllPosts = async(req, res) => {
  try{
    let posts = await Post.find().populate('question.user question.tags').sort({createdAt:-1});
    if(!posts) return res.status(400).json({error:'No posts found!'});
    res.status(200).json({
      message:'Fetched posts successfully',
      posts
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getSinglePost = async(req, res) => {
  try{
    let { postId } = req.params;
  let post = await Post.findById(postId).populate('question.user question.tags answer.user answer.comments.user');
    if(!post) return res.status(400).json({error:'No post found!'});
    res.status(200).json({
      message:'Fetched post successfully',
      post
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }


}

exports.getUserPosts = async(req, res) => {
  try{
  let { userId } = req.params;
  let posts = await Post.find({'question.user':userId}).populate('question.user question.tags').sort({createdAt:-1});
  if(!posts) return res.status(400).json({error:'No posts found of this user'});
  res.status(200).json({
    message:'Fetched user posts successfully',
    posts
  })
}catch(error){
  console.log(error);
  res.status(500).json({error:"Something went wrong!"})
}
}

exports.getFeed = async(req, res) => {
  try{
  let posts = await Post.find({'question.tags':{ $in: req.user.tags}}).populate('question.user question.tags').sort({createdAt:-1});
  if(posts.length==0){
    posts = await Post.find().populate('question.user question.tags').sort({createdAt:-1});
  }
  if(!posts) return res.status(400).json({error:'No posts found of this user'});
  res.status(200).json({
    message:'Fetched feed successfully',
    posts
  })
}catch(error){
  console.log(error);
  res.status(500).json({error:"Something went wrong!"})
}
}

exports.upvoteAnswer = async(req, res) => {
  try{
    let { postId, answerId } = req.body;
    let userId = req.user._id;
    let existingPost = await Post.findById(postId);
    if(!existingPost) return res.status(400).json({error:'Post not found'});
    await existingPost.answer.map((a)=>{
      if(a._id==answerId){
        if(a.upvotes.includes(userId)) return res.status(400).json({error:'Already upvoted this answer'});
        if(a.downvotes.includes(userId)){
          let index = a.downvotes.indexOf(userId);
          a.downvotes.splice(index,1);
        }
        a.upvotes.push(userId);
      }

    });
    await existingPost.save();
    res.status(200).json({
      message:'Answer upvoted successfully!',
      existingPost
    })

  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.downvoteAnswer = async(req, res) => {
  try{
    let { postId, answerId } = req.body;
    let userId = req.user._id;
    let existingPost = await Post.findById(postId);
    if(!existingPost) return res.status(400).json({error:'Post not found'});
    await existingPost.answer.map((a)=>{
      if(a._id==answerId){
        if(a.downvotes.includes(userId)) return res.status(400).json({error:'Already downvoted this answer'});
        if(a.upvotes.includes(userId)){
          let index= a.upvotes.indexOf(userId);
          a.upvotes.splice(index,1);
        }
              a.downvotes.push(userId);
      }

    });
    await existingPost.save();
    res.status(200).json({
      message:'Answer downvoted successfully!',
      existingPost
    })

  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.updateQuestion = async(req, res) => {
  try{
   let { postId } = req.params;
    let { title, description, tags } = req.body;
   if(!postId||postId=="") return res.status(400).json({error:'PostId is required'});
   let existingPost = await Post.findById(postId);
   if(!existingPost) return res.status(400).json({error:'Post does not exists'})
   if(existingPost.user!==req.user._id) return res.status(400).json({error:'Cannot edit this post!'})
    if(req.files){
      var imageArray= req.files.map((f)=>{
         var fileName =shortid.generate() + path.extname(f.originalname);
          bucket.file(fileName).createWriteStream().end(f.buffer)
            const url = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${fileName}?alt=media`;
            return url;
        });
        req.body.images=imageArray;
    }
    let updatedPost = await Post.findByIdAndUpdate(postId,req.body,{new: true})
     res.status(200).json({
       message: 'Post edited successfully',
       updatedPost
     })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.updateAnswer = async(req, res) => {
  try{
   let { postId, answerId } = req.params;
   if(!postId||postId=="") return res.status(400).json({error:'PostId is required'});
   if(!answerId||answerId=="") return res.status(400).json({error:'AnswerId is required'});
   let existingPost = await Post.findById(postId);
    if(!existingPost) return res.status(400).json({error:'Post does not exists'})
    if(req.files){
      var imageArray= req.files.map((f)=>{
         var fileName =shortid.generate() + path.extname(f.originalname);
          bucket.file(fileName).createWriteStream().end(f.buffer)
            const url = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${fileName}?alt=media`;
            return url;
        });
        req.body.images=imageArray;
    }
    existingPost = await Post.findOneAndUpdate({'answer._id':answerId},{'answer.$':req.body},{new: true});
    console.log(existingPost)
     res.status(200).json({
       message: 'Post edited successfully'
     })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.savePost = async(req, res) => {
  try{
    let {postId} = req.params;
    if(!postId) return res.status(400).json({error:'Post ID is required'});
    let existingUser = await User.findById(req.user._id);
    if(existingUser.savedPosts.includes(postId)){
      let index = existingUser.savedPosts.indexOf(postId);
      existingUser.savedPosts.splice(index,1);
      await existingUser.save();
      return res.status(200).json({
        message:'Unsaved post successfully'
      });
    }
    existingUser.savedPosts.push(postId);
    await existingUser.save();
    res.status(200).json({
      message:'Saved post successfully'
    })
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.getSavedPost = async(req, res) => {
  try{
    let existingUser = await User.findById(req.user._id).populate(
      {
            path: 'savedPosts',
            model: 'Post',
            populate: [{
                path: 'question.user',
                model: 'User'
            },{
                path: 'question.tags',
                model: 'Tag'
            }]
        }
    );
    res.status(200).json({
      message:'Fetch saved post successfully',
      posts: existingUser.savedPosts
    })

  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}
