const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema=new Schema({
    comment: String,
    user:{
        type: ObjectId,
        ref:'User'
    }
});

const answerSchema=new Schema({
description: String,
images: [],
user:{
    type: ObjectId, 
    ref:'User'
},
upvotes:[{
    type: ObjectId, 
    ref:'User'
}],
comments:[commentSchema]
});

const postSchema=new Schema({
question: {
    title: String,
    description: String,
    images: [],
    user: {
        type: ObjectId,
        ref: 'User'
    },
    tags:[{
        type: ObjectId,
        ref:'Tag'
    }]

},
answer: [answerSchema]
},{timestamps: true});

module.exports = mongoose.model('Post', postSchema);