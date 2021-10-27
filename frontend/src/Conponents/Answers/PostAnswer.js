import React from 'react'
import {Link} from "react-router-dom";

function PostAnswer({answer}) {
    return (
        <div className="ProfilePost" >
            <div className="PostTop"><img alt="" className="PostLogo" src={answer.user.profilePicture} /><div><span className="PostHeadName"><Link to={{pathname:'/profile',state:answer.user._id}} style={{textDecoration:"none"}}>{answer.user.name}</Link></span><span className="PostHeadCollege">{answer.user.college}</span></div></div>
            <div className="PostAnswer">
              {answer.description}
            </div>
            {answer.images&&answer.images.map((i)=>
              <div style={{marginTop:20,textAlign:'center'}}>
              <img src={i} height='500px' width='500px'/>
              </div>
            )}
        </div>
    )
}

export default PostAnswer
