import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfilePost from '../Profile/ProfilePost';
import ProfileSuggest from '../Profile/ProfileSuggest';
import HomePost from './HomePost';
import { useHistory } from 'react-router';
import AnswerModal from './AnswerModal';
import axios from "axios";
import Swal from "sweetalert2";
import EditQuestion from "../EditModals/EditQuestion";
import {vapidKey} from "../../utils/vapidKey";
import {messaging} from "../../utils/Firebase";

function Home() {
    const history = useHistory();
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [open, setopen] = useState(0);
    const [posts, setPosts] = useState([]);
    const [savedPosts,setSavedPosts]=useState([]);
    const [profiles,setProfiles] = useState([]);
    const [modal,setModal]=useState("");
    const [editModal,setEditModal]=useState(0);
    const [tags,setTags] = useState([]);
    const [editData,setEditData]=useState("");

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
        let resp = await axios.get('/savedPost/all',{ headers: { "Authorization" : `Bearer ${token}`} });
        if(resp.data.message){
          setSavedPosts(resp.data.posts)
        }
      }
    }

    const postFCM =async(data)=> {
      let resp = await axios.put(`/fcm`,{fcm:data},{ headers: { "Authorization" : `Bearer ${token}`} });
      if(resp.data.message){
        console.log("saved fcm")
      }
    }

    const fetchFCM = async() => {
      await messaging.requestPermission();
      let data = await messaging.getToken({vapidKey});

      if(localStorage.getItem("fcm")){
      if(JSON.parse(localStorage.getItem("fcm"))===data)
      console.log("Already in db")
      else {
        localStorage.removeItem("fcm");
        localStorage.setItem("fcm",JSON.stringify(data))
        await postFCM(data)
      }
    }else{
        localStorage.setItem("fcm",JSON.stringify(data))
        await postFCM(data)
    }
    }

    useEffect(()=>{
      fetchTags();
      fetchPosts();
      fetchProfiles();
      fetchSavedPosts();
      if(token){
        fetchFCM();
      }
    },[]);

    messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

    return (
        <div className="ProfileContainer">
          <AnswerModal open={open} setopen={setopen} modal={modal} setModal={setModal}/>
          <EditQuestion editModal={editModal} setEditModal={setEditModal} post={editData} fetchPosts={fetchPosts}/>
            <div className="ProfileLeft">
                {posts?posts.length==0?<h3>No posts found!</h3>:posts.map((p)=>{
                  return(<><HomePost setopen={setopen} fetchPosts={fetchPosts}editData={editData} setEditData={setEditData} post={p} setModal={setModal} editModal={editModal} setEditModal={setEditModal} savedPosts={savedPosts} setSavedPosts={setSavedPosts} fetchSavedPosts={fetchSavedPosts}/></>)
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
                               await fetchPosts();
                               await fetchProfiles();
                              }
                            }} />}</span>
                      </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Home
