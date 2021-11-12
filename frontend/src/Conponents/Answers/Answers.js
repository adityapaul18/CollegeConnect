import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfileSuggest from '../Profile/ProfileSuggest';
import './Answers.css'
import HomePost from '../Home/HomePost';
import PostAnswer from './PostAnswer';
import axios from 'axios';
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import CommentModal from './CommentModal';
import moment from "moment";

function Answers(props) {
    let postId = props&&props.location.state;
    const [post,setPost]=useState("");
    const [profiles,setProfiles] = useState([]);
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [tags,setTags] = useState([]);
    const [open, setopen] = useState(0);
    const [answerId,setAnswerId]=useState("");

    const fetchProfiles = async() => {
        if(token){
          let resp = await axios.get('/profile/custom',{ headers: { "Authorization" : `Bearer ${token}`} });
          if(resp.data.message){
            setProfiles(resp.data.users)
          }
        }else{
          let resp = await axios.get('/profile/all');
          if(resp.data.message){
            setProfiles(resp.data.users.filter((u)=>u._id!=userID))
          }
        }
      }

      const fetchTags = async() => {
        let resp = await axios.get('/tag/all');
        if(resp.data.message){
          setTags(resp.data.tags);
        }
      }

      const fetchSinglePost = async() => {
        let resp = await axios.get(`/post/single/${postId}`);
        if(resp.data.message){
          setPost(resp.data.post);
        }
      }

      useEffect(()=>{
        fetchTags();
        fetchSinglePost();
        fetchProfiles();
      },[props&&props.location]);
    return (
      <>
      <div className="moveBottom">
          <Header/>
      </div>
      <CommentModal open={open} setopen={setopen} postId={post._id} answerId={answerId}/>
        <div className="ProfileContainer">
            {post&&<div className="ProfileLeft">
                <div className="ProfilePost" >
                <div className="PostTop"><img alt="" className="PostLogo" src={post.question.user.profilePicture} /><div><span className="PostHeadName"><Link to={{pathname:'/profile',state:post.question.user._id}} style={{textDecoration:"none"}}>{post.question.user.name}</Link></span><span className="PostHeadCollege">{post.question.user.college}</span></div></div>
                    <div className="PostAnswer">
                        <h2>{post.question.title}</h2>
                        <h4>Asked {moment(post.createdAt).fromNow()}</h4>
                      {post.question.description}
                        <div className="TagsBox">
                            {post.question.tags.map((t)=><span className="TagSuggest">{t.name}</span>)}
                        </div>
                        {post.question.images&&post.question.images.map((i)=>
                          <div style={{marginTop:20,textAlign:'center'}}>
                          <img src={i} width='500px'/>
                          </div>
                        )}
                    </div>
                </div>
                <h3>Answers</h3>
                {post.answer?post.answer.length==0?<h3>No answers found!</h3>:post.answer.map((a)=><PostAnswer answer={a} setopen={setopen} setAnswerId={setAnswerId}/>):<h3>Loading...</h3>}
            </div>}
            <div className="ProfileRight">
                <div className="ProfileRightHead" >Suggestions</div>
                {profiles?profiles.length==0?<h3>No suggested profile found</h3>:profiles.sort(() => Math.random() - Math.random()).slice(0, 5).map((p)=>
                  <ProfileSuggest profile={p}/>
                ):<h3>Loading...</h3>
              }
                <div className="ProfileRightHead" >Suggested Tags</div>
                <div>
                {tags&&tags.sort(() => Math.random() - Math.random()).slice(0, 5).map((t)=>
                  <div className="SuggestdTagsBox">
                  <span className="TagSuggest">{t.name} <AddIcon /></span>
                  </div>
                )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Answers
