import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfilePost from '../Profile/ProfilePost';
import ProfileSuggest from '../Profile/ProfileSuggest';
import HomePost from './HomePost';
import { useHistory } from 'react-router';
import AnswerModal from './AnswerModal';
import './Saved.css'
import axios from 'axios';

function Saved() {
    const history = useHistory()
    const [profiles,setProfiles] = useState([]);
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [tags,setTags] = useState([]);
    const [open, setopen] = useState(0);
    const [modal,setModal]=useState("");
    const [savedPosts,setSavedPosts]=useState([]);

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

      const fetchSavedPosts = async() => {
        if(token){
          let resp = await axios.get('/savedPost/all',{ headers: { "Authorization" : `Bearer ${token}`} });
          if(resp.data.message){
            setSavedPosts(resp.data.posts)
          }
        }
      }

      useEffect(()=>{
        fetchTags();
        fetchSavedPosts();
        fetchProfiles();
      },[]);
    return (
        <>
        <h2 className="SavedHeader">Your Saved Posts</h2>
        <div className="ProfileContainer">
        <AnswerModal open={open} setopen={setopen} modal={modal} setModal={setModal}/>
          <div className="ProfileLeft">
              {savedPosts?savedPosts.length==0?<h3>No posts found!</h3>:savedPosts.map((p)=>{
                return(<><HomePost setopen={setopen} post={p} setModal={setModal} savedPosts={savedPosts} setSavedPosts={setSavedPosts} fetchSavedPosts={fetchSavedPosts}/></>)
              }):<h3>Loading...</h3>}

          </div>
            <div className="ProfileRight">
                <div className="ProfileRightHead" >Suggestions</div>
                {profiles?profiles.length===0?<h3>No suggested profile found</h3>:profiles.sort(() => Math.random() - Math.random()).slice(0, 5).map((p)=>
                  <ProfileSuggest profile={p}/>
                ):<h3>Loading...</h3>
              }
                <div className="ProfileRightHead" >Suggested Tags</div>
                <div>
                    <div className="SuggestdTagsBox">
                        <span className="TagSuggest">CP <AddIcon /></span>
                        <span className="TagSuggest">Flutter<AddIcon /></span>
                        <span className="TagSuggest">PayTm<AddIcon /></span>
                    </div>
                    <div className="SuggestdTagsBox">
                        <span className="TagSuggest">Web D <AddIcon /></span>
                        <span className="TagSuggest">DSA<AddIcon /></span>
                        <span className="TagSuggest">Google<AddIcon /></span>
                    </div>
                    <div className="SuggestdTagsBox">
                        {/* <span className="TagSuggest">Photography<AddIcon /></span>
                        <span className="TagSuggest">IIIT<AddIcon /></span> */}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Saved
