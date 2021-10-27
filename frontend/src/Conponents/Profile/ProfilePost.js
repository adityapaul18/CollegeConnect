import { Avatar } from '@material-ui/core'
import React from 'react'
import {Link} from "react-router-dom";
function ProfilePost({post}) {
    return (
        <div className="ProfilePost" >
        <div className="PostTop"><img alt="" className="PostLogo" src={post.question.user.profilePicture}/><div><span className="PostHeadName"><Link to={{pathname:'/profile',state:post.question.user._id}} style={{textDecoration:"none"}}>{post.question.user.name}</Link></span><span className="PostHeadCollege">{post.question.user.college}</span></div></div>
        <div className="PostAnswer">
        <h2>{post.question.title}</h2>
      {post.question.description&&post.question.description.substring(0,400)}
        </div>
    </div>
    )
}

export default ProfilePost
