import React, { useState } from 'react'
import { Button, MenuItem, TextField } from '@material-ui/core'
import '../Home/Home.css'
import AddIcon from '@material-ui/icons/Add';
import AddCommentIcon from '@material-ui/icons/AddComment';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";

function HomePost({ setopen, fetchPosts,post, setModal,savedPosts, setSavedPosts,fetchSavedPosts,editModal,setEditModal,editData,setEditData}) {
    const history = useHistory();
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [option, setoption] = useState("");

    return (
        <div className="ProfilePost" >
            <div className="PostTop">
                <div className="PostTop">
                    <img alt="" className="PostLogo" src={post.question.user.profilePicture} /><div><span className="PostHeadName"><Link to={{ pathname: '/profile', state: post.question.user._id }} style={{ textDecoration: "none" }}>{post.question.user.name}</Link></span><span className="PostHeadCollege">{post.question.user.college}</span></div>
                </div>
                {userID==post.question.user._id&&<TextField value=":" className="optionMenu" select>
                    <MenuItem value="Edit" onClick={() => { setEditModal(1);setEditData(post)}}>Edit</MenuItem>
                    <MenuItem value="Delete"
                    onClick={async(e)=>{
                      e.preventDefault();
                      Swal.fire({
                        title: 'Do you want to delete this post?',
                        showCancelButton: true,
                        confirmButtonText: 'Delete'
                      }).then(async(result) => {
                        if (result.isConfirmed) {
                          let resp = await axios.delete(`/question/${post._id}`,{ headers: { "Authorization" : `Bearer ${token}`} });
                          if(resp.data.message){
                            await fetchPosts()
                          }
                        }
                        })
                    }}
                    >Delete</MenuItem>
                </TextField>}
            </div>
            <div className="PostAnswer">
                <h2>{post.question.title}</h2>
                <h4>Asked {moment(post.createdAt).fromNow()}</h4>
                {post.question.description && post.question.description.substring(0, 400)}
                <div className="TagsBox">
                    {post.question.tags && post.question.tags.map((t) => <span className="TagSuggest">{t.name}</span>)}
                </div>
                <div className="ShowAnswers" > {token && <span onClick={() => { setopen(1); setModal(post) }}>Write Answer</span>} <span onClick={() => history.push({ pathname: '/answers', state: post._id })}> Show Answers </span>{token?savedPosts.filter((s)=>s._id==post._id)[0]?<BookmarkIcon
                  onClick={async(e)=>{
                    e.preventDefault();
                    let resp = await axios.get(`/post/save/${post._id}`,{ headers: { "Authorization" : `Bearer ${token}`} });
                    if(resp.data.message){
                      await fetchSavedPosts();
                      Swal.fire({
                        icon: 'success',
                        text: resp.data.message
                      })
                    }
                  }}
                  />:<BookmarkBorderIcon
                  onClick={async(e)=>{
                    e.preventDefault();
                    let resp = await axios.get(`/post/save/${post._id}`,{ headers: { "Authorization" : `Bearer ${token}`} });
                    if(resp.data.message){
                      await fetchSavedPosts();
                      Swal.fire({
                        icon: 'success',
                        text: resp.data.message
                      })
                    }
                  }}
                  />:(null) }</div>
            </div>
        </div>
    )
}

export default HomePost
