import React from 'react'
import {Link} from "react-router-dom";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './Answers.css';
import axios from "axios";
import Swal from "sweetalert2";

function PostAnswer({postId,answer,setopen,setAnswerId,fetchSinglePost}) {
  const userID = localStorage.getItem("CConID");
  const token = localStorage.getItem("CConUser");
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
            <div className="answerLower" >
                {token?(<><div><ArrowDropUpIcon style={{fontSize:50}} className={answer.upvotes.includes(userID)&&"Selected"} onClick={async(e)=>{
                  e.preventDefault();
                  try{
                    let resp = await axios.put(`/post/upvote`,{postId,answerId:answer._id},{ headers: { "Authorization" : `Bearer ${token}`} });
                    if(resp.data.message){
                      fetchSinglePost();
                    }
                  }catch(err){
                    Swal.fire({
                      icon: 'error',
                      text: err.response.data.error
                    })
                  }
                }}/>{answer.upvotes.length}</div>
                <div><ArrowDropDownIcon style={{fontSize:50}}
                className={answer.downvotes.includes(userID)&&"Selected"}
                onClick={async(e)=>{
                  e.preventDefault();
                  try{
                    let resp = await axios.put(`/post/downvote`,{postId,answerId:answer._id},{ headers: { "Authorization" : `Bearer ${token}`} });
                    if(resp.data.message){
                      fetchSinglePost();
                    }
                  }catch(err){
                    Swal.fire({
                      icon: 'error',
                      text: err.response.data.error
                    })
                  }
                }}
                />{answer.downvotes.length}</div></>)
                  :(<><div><ArrowDropUpIcon style={{fontSize:50}}/>{answer.upvotes.length}</div>
                  <div><ArrowDropDownIcon style={{fontSize:50}}/>{answer.downvotes.length}</div></>)}
                <div onClick={() =>{setopen(1); setAnswerId(answer._id)}}><ChatBubbleIcon style={{marginRight:"10px"}}/>Comment</div>
            </div>
        </div>
    )
}

export default PostAnswer
