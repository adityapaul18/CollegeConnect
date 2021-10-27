import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfileSuggest from '../Profile/ProfileSuggest';
import './Answers.css'
import HomePost from '../Home/HomePost';
import PostAnswer from './PostAnswer';
import axios from 'axios';
import Header from "../Header/Header";

function Answers() {
    const [profiles,setProfiles] = useState([]);
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [tags,setTags] = useState([]);

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

      useEffect(()=>{
        fetchTags();
        //fetchSinglePost();
        fetchProfiles();
      },[]);
    return (
      <>
      <Header/>
        <div className="ProfileContainer">
            <div className="ProfileLeft">
                <div className="ProfilePost" >
                    <div className="PostTop"><img alt="" className="PostLogo" src="https://qph.fs.quoracdn.net/main-thumb-282129127-200-wdsefxcvsewcnoifsgtqymhoydgblwha.jpeg" /><div><span className="PostHeadName">Aditya Paul</span><span className="PostHeadCollege">3rd year student at Indian Institute of Information Technology, Surat</span></div></div>
                    <div className="PostAnswer">
                        <h2>Question main heading here </h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        <div className="TagsBox">
                            <span className="TagSuggest">Web D </span>
                            <span className="TagSuggest">DSA</span>
                            <span className="TagSuggest">Google</span>
                        </div>
                    </div>
                </div>
                <h3>Answers</h3>
                <PostAnswer />
                <PostAnswer />
                <PostAnswer />
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
        </>
    )
}

export default Answers
