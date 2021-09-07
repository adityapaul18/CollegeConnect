const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const userSchema=new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
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
    },
  coverImage: String,
  enrolled: {
    type: Boolean,
    default: true
  },
  college: String,
  branch: String,
  academicYear: String,
  tags: [{
    type: ObjectId,
    ref:'Tag'
  }]

},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
