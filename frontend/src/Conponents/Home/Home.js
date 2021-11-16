import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfilePost from '../Profile/ProfilePost';
import ProfileSuggest from '../Profile/ProfileSuggest';
import HomePost from './HomePost';
import { useHistory } from 'react-router';
import AnswerModal from './AnswerModal';
import axios from "axios";

function Home() {
    const history = useHistory();
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [open, setopen] = useState(0);
    const [posts, setPosts] = useState([]);
    const [savedPosts,setSavedPosts]=useState([]);
    const [profiles,setProfiles] = useState([]);
    const [modal,setModal]=useState("");
    const [tags,setTags] = useState([]);

    const fetchPosts = async() => {
      if(token){
        let resp = await axios.get('/feed',{ headers: { "Authorization" : `Bearer ${token}`} });
        if(resp.data.message){
          setPosts(resp.data.posts)
        }


      }else{
        let resp = await axios.get(`/post/all`);
        if(resp.data.message){
          setPosts(resp.data.posts);
        }
      }

    }

    const fetchTags = async() => {
      let resp = await axios.get('/tag/all');
      if(resp.data.message){
        setTags(resp.data.tags);
      }
    }

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

    const fetchSavedPosts = async() => {
      if(token){
        let resp = await axios.get('/save/all',{ headers: { "Authorization" : `Bearer ${token}`} });
        if(resp.data.message){
          setSavedPosts(resp.data.posts)
        }
      }
    }

    useEffect(()=>{
      fetchTags();
      fetchPosts();
      fetchProfiles();
      fetchSavedPosts();
    },[open]);
    return (
        <div className="ProfileContainer">
          <AnswerModal open={open} setopen={setopen} modal={modal} setModal={setModal}/>
            <div className="ProfileLeft">
                {posts?posts.length==0?<h3>No posts found!</h3>:posts.map((p)=>{
                  return(<><HomePost setopen={setopen} post={p} setModal={setModal} savedPosts={savedPosts} fetchSavedPosts={fetchSavedPosts}/></>)
                }):<h3>Loading...</h3>}

            </div>
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
    )
}

export default Home
