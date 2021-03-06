import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfileSuggest from '../Profile/ProfileSuggest';
import './Answers.css'
import HomePost from '../Home/HomePost';
import PostAnswer from './PostAnswer';
import axios from 'axios';
import Header from "../Header/Header";
import { Link, useHistory } from "react-router-dom";
import CommentModal from './CommentModal';
import moment from "moment";
import AnswerModal from '../Home/AnswerModal';
import { MenuItem, TextField } from '@material-ui/core';
import Swal from "sweetalert2";
import EditQuestion from "../EditModals/EditQuestion";

function Answers(props) {
  const history = useHistory();
  let postId = props && props.location.state;
  const [post, setPost] = useState("");
  const [profiles, setProfiles] = useState([]);
  const userID = localStorage.getItem("CConID");
  const token = localStorage.getItem("CConUser");
  const [tags, setTags] = useState([]);
  const [open, setopen] = useState(0);
  const [open2, setopen2] = useState(0);
  const [answerId, setAnswerId] = useState("");
  const [modal, setModal] = useState("");
  const [editModal,setEditModal]=useState(0);


  const fetchProfiles = async () => {
    if (token) {
      let resp = await axios.get('/profile/custom', { headers: { "Authorization": `Bearer ${token}` } });
      if (resp.data.message) {
        setProfiles(resp.data.users)
      }
    } else {
      let resp = await axios.get('/profile/all');
      if (resp.data.message) {
        setProfiles(resp.data.users.filter((u) => u._id != userID))
      }
    }
  }

  const fetchTags = async() => {
      let resp = await axios.get('/tag/all');
      if(resp.data.message){

          if(token){
            let response = await axios.get('/tag/follow',{ headers: { "Authorization" : `Bearer ${token}`} });
            if(response.data.message){

            setTags(resp.data.tags.filter((v)=>response.data.tags.filter((s)=>s._id==v._id).length==0))
            }
          }else{
            setTags(resp.data.tags);
          }
      }

  }

  const fetchSinglePost = async () => {
    let resp = await axios.get(`/post/single/${postId}`);
    if (resp.data.message) {
      setPost(resp.data.post);
    }
  }

  useEffect(() => {
    fetchTags();
    fetchSinglePost();
    fetchProfiles();
  }, [props && props.location]);
  return (
    <>
      <div className="moveBottom">
        <Header />
      </div>
      <CommentModal open={open} setopen={setopen} postId={post._id} answerId={answerId} fetchSinglePost={fetchSinglePost} />
      <AnswerModal open={open2} setopen={setopen2} modal={modal} setModal={setModal} />
      <EditQuestion editModal={editModal} setEditModal={setEditModal} post={post} fetchPosts={fetchSinglePost}/>
      <div className="ProfileContainer">
        {post && <div className="ProfileLeft">
          <div className="ProfilePost" >
            {/* <div className="PostTop"><img alt="" className="PostLogo" src={post.question.user.profilePicture} /><div><span className="PostHeadName"><Link to={{ pathname: '/profile', state: post.question.user._id }} style={{ textDecoration: "none" }}>{post.question.user.name}</Link></span><span className="PostHeadCollege">{post.question.user.college}</span></div></div> */}
            <div className="PostTop">
                <div className="PostTop">
                    <img alt="" className="PostLogo" src={post.question.user.profilePicture} /><div><span className="PostHeadName"><Link to={{ pathname: '/profile', state: post.question.user._id }} style={{ textDecoration: "none" }}>{post.question.user.name}</Link></span><span className="PostHeadCollege">{post.question.user.college}</span></div>
                </div>
                {userID==post.question.user._id&&<TextField value=":" className="optionMenu" select>
                    <MenuItem value="Edit" onClick={() => { setEditModal(1); }}>Edit</MenuItem>
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
                            history.push("/home")
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
              {post.question.description}
              <div className="TagsBox">
                {post.question.tags.map((t) => <span className="TagSuggest">{t.name}</span>)}
              </div>
              {post.question.images && post.question.images.map((i) =>
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                  <img src={i} width='500px' />
                </div>
              )}
              <div className="ShowAnswers2" > {token&&<span onClick={() => {setopen2(1); setModal(post)}}>Write Answer</span>}</div>
            </div>
          </div>
          <h3>Answers</h3>
          {post.answer ? post.answer.length == 0 ? <h3>No answers found!</h3> : post.answer.sort(function (a, b) {
            if (a.upvotes.length > b.upvotes.length) return -1;
            if (a.upvotes.length < b.upvotes.length) return 1;
            return 0;
          }).map((a) => <PostAnswer postId={post._id} answer={a} setopen={setopen} setAnswerId={setAnswerId} fetchSinglePost={fetchSinglePost} />) : <h3>Loading...</h3>}
        </div>}
        <div className="ProfileRight">
          <div className="ProfileRightHead" >Suggestions</div>
          {profiles ? profiles.length == 0 ? <h3>No suggested profile found</h3> : profiles.sort(() => Math.random() - Math.random()).slice(0, 5).map((p) =>
            <ProfileSuggest profile={p} />
          ) : <h3>Loading...</h3>
          }
          <div className="ProfileRightHead" >Suggested Tags</div>
          <div>
            {tags && tags.sort(() => Math.random() - Math.random()).slice(0, 5).map((t) =>
              <div className="SuggestdTagsBox">
                  <span className="TagSuggest">{t.name} {token&&<AddIcon
                    onClick={async(e)=>{
                      e.preventDefault();
                      let resp = await axios.get(`/tag/${t._id}`,{ headers: { "Authorization" : `Bearer ${token}`} });
                      if(resp.data.message){
                        Swal.fire({
                          icon: 'success',
                          text: resp.data.message
                        });
                       await fetchTags();
                       await fetchProfiles();
                      }
                    }} />}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Answers
