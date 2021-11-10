import React from 'react'
import {Link} from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './Answers.css'
function PostAnswer({answer,setopen}) {
    return (
        <div className="ProfilePost" >
            <div className="PostTop"><img alt="" className="PostLogo" src={answer.user.profilePicture} /><div><span className="PostHeadName"><Link to={{pathname:'/profile',state:answer.user._id}} style={{textDecoration:"none"}}>{answer.user.name}</Link></span><span className="PostHeadCollege">{answer.user.college}</span></div></div>
            <div className="PostAnswer">
              {answer.description}
            </div>
            {answer.images&&answer.images.map((i)=>
              <div style={{marginTop:20,textAlign:'center'}}>
              <img src={i} width='500px'/>
              </div>
            )}
            <div className="answerLower" >{1?
                <div className="Selected"><ThumbUpIcon/>Like</div>
                :<div><ThumbUpIcon/>Like</div>
                }
                <div><ThumbDownAltIcon/>Dislike</div>
                <div onClick={() =>setopen(1)}><ChatBubbleIcon/>Comment</div>
            </div>
        </div>
    )
}

export default PostAnswer
