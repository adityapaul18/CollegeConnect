import { Avatar } from '@material-ui/core'
import React from 'react'
import {Link} from "react-router-dom";
import { useHistory } from 'react-router';

function ProfilePost({setopen,post,setModal}) {
  const history = useHistory();
  const userID = localStorage.getItem("CConID");
  const token = localStorage.getItem("CConUser");
  return (
      <div className="ProfilePost" >
          <div className="PostTop"><img alt="" className="PostLogo" src={post.question.user.profilePicture} /><div><span className="PostHeadName"><Link to={{pathname:'/profile',state:post.question.user._id}} style={{textDecoration:"none"}}>{post.question.user.name}</Link></span><span className="PostHeadCollege">{post.question.user.college}</span></div></div>
          <div className="PostAnswer">
              <h2>{post.question.title}</h2>
            {post.question.description&&post.question.description.substring(0,400)}
              <div className="TagsBox">
              {post.question.tags&&post.question.tags.map((t)=><span className="TagSuggest">{t.name}</span>)}
              </div>
              <div className="ShowAnswers" > <span onClick={() => history.push({pathname:'/answers',state:post._id})}> Show Answers </span></div>
          </div>
      </div>
  )
}


export default ProfilePost
