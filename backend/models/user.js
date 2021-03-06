const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
const moment=require("moment");

const userSchema=new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  profilePicture: {
      type: String,
      default:`http://gravatar.com/avatar/${moment().unix()}?d=identicon`
    },
  coverImage: String,
  enrolled: {
    type: Boolean,
    default: false
  },
  bio: String,
  college: String,
  branch: String,
  academicYear: String,
  fcmToken: String,
  tags: [{
    type: ObjectId,
    ref:'Tag'
  }],
  savedPosts: [{
    type: ObjectId,
    ref:'Post'
  }],

},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
