import React,{useState,useEffect} from 'react'
import ReactModal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { Avatar, Button, TextField } from '@material-ui/core';
import Swal from "sweetalert2";
import axios from "axios";
import {Link} from "react-router-dom";

function CommentModal({open,setopen,postId,answerId}) {
  const userID = localStorage.getItem("CConID");
  const token = localStorage.getItem("CConUser");
  const [loading,setLoading]=useState(false);
  const [comment,setComment]=useState("");
  const [comments,setComments]=useState([]);

  const getComments = async() => {
    let resp = await axios.get(`/post/single/${postId}`);
    if(resp.data.message){
      let answer=await resp.data.post&&resp.data.post.answer.filter((a)=>a._id==answerId)[0];
      if(answer){
              await setComments(answer.comments)
      }
    }
  }

  useEffect(()=>{
    getComments();
  },[postId,answerId])
    return (

        <div>
            <ReactModal isOpen={open} portalClassName="answermodal">
                <CloseIcon className="close" onClick={() => setopen(0)} />
                <div className="commentContainer">
                    <div>
                        {comments?comments.length==0?(<h2>No comments found on this answer</h2>):comments.map((c)=>
                          <div className="comment">
                          <div className="PostTop"><img alt="" className="PostLogo" src={c.user.profilePicture} /><div><span className="PostHeadName"><Link to={{pathname:'/profile',state:c.user._id}} style={{textDecoration:"none"}}>{c.user.name}</Link></span></div></div>
                              <div style={{marginLeft:40}}>
                                {c.comment}
                              </div>
                          </div>
                        ):(null)}
                          </div>
                    {token&&<div className="commentMaker" >
                        <TextField variant="outlined" placeholder="Add Comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        <Button className="CommentButton"
                        onClick={async(e)=>{
                          setLoading(true);
                          e.preventDefault();
                          try{
                            let resp = await axios.put(`/comment`,{postId,answerId,comment},{ headers: { "Authorization" : `Bearer ${token}`} });
                            if(resp.data.message){
                              setLoading(false);
                              setComment("");
                              getComments();
                            }
                          }catch(err){
                            setLoading(false);
                            Swal.fire({
                              icon: 'error',
                              text: err.response.data.error
                            })
                          }

                        }}
                        ><SendIcon/></Button>
                    </div>}
                </div>
            </ReactModal>
        </div>
    )
}

export default CommentModal
