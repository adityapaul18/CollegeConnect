import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, Typography } from '@material-ui/core'
import ProfileCover from "../../images/ProfileCover.png"
import AddIcon from '@material-ui/icons/Add';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import './Profile.css'
import ProfilePost from './ProfilePost';
import ProfileSuggest from './ProfileSuggest';
import axios from 'axios';
import EditModal from './EditModal';
import Header from "../Header/Header";
import AnswerModal from '../Home/AnswerModal';
import Swal from "sweetalert2";
import EditQuestion from "../EditModals/EditQuestion";

function Profile(props) {
    const id = props && props.location.state;
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser")
    const [open, setopen] = useState(0)
    const [open2, setopen2] = useState(0)
    const [user, setuser] = useState("");
    const [posts, setPosts] = useState([]);
    const [savedPosts,setSavedPosts]=useState([]);
    const [profiles, setProfiles] = useState([]);
    const [tags, setTags] = useState([]);
    const [modal, setModal] = useState("");
    const [editData,setEditData]=useState("");
    const [editModal,setEditModal]=useState(0);

    const fetchUserPosts = async () => {
        let resp = await axios.get(`/post/user/${id}`);
        if (resp.data.message) {
            setPosts(resp.data.posts);
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

    const fetchProfiles = async () => {
        if (token && userID == id) {
            let resp = await axios.get('/profile/custom', { headers: { "Authorization": `Bearer ${token}` } });
            if (resp.data.message) {
                setProfiles(resp.data.users)
            }
        } else {
            let resp = await axios.get('/profile/all');
            if (resp.data.message) {
                setProfiles(resp.data.users.filter((u) => u._id != id))
            }
        }
    }
    const fetchProfile = async () => {
        let resp = await axios.get(`/profile/single/${id}`);
        if (resp.data.message) {
            setuser(resp.data.user)
        }
    }

    const fetchSavedPosts =async() => {
      if(userID==user._id&&token){
        let resp = await axios.get('/savedPost/all',{ headers: { "Authorization" : `Bearer ${token}`} });
        if(resp.data.message){
          setSavedPosts(resp.data.posts)
        }
      }
    }
    useEffect(() => {
        fetchProfile();
        fetchUserPosts();
        fetchProfiles();
        fetchTags();
        fetchSavedPosts();
    }, [props && props.location, open])


    return (<>
        <div className="moveBottom">
            <Header />
        </div>
        <div className="ProfileContainer">
            <EditModal open={open} setopen={setopen} user={user} />
            <EditQuestion editModal={editModal} setEditModal={setEditModal} post={editData} fetchPosts={fetchUserPosts}/>
            <AnswerModal open={open2} setopen={setopen2} modal={modal} setModal={setModal} />
            <div className="ProfileLeft">
                <img className="ProfileCover" src={user.coverImage ? user.coverImage : ProfileCover} alt="" />
                <div className="ProfileInfo" >
                    <div className="ProfileInfoTop">
                        <img className="ProfileAvatar" src={user.profilePicture} alt=""></img>
                        {userID == id && <Button className="EditProfileButton" onClick={() => setopen(1)} >Edit Profile</Button>}
                    </div>
                    <div className="ProfileInfoBottom">
                        <b>{user.name}</b>
                        <div className="ProfileSubInfo"><b>{user?.bio}</b></div>
                        <div className="ProfileSubInfo">{user?.college}</div>
                        <div className="ProfileSubInfo">{user?.branch}</div>
                        <div className="ProfileSubInfo">{user?.academicYear}</div>
                    </div>

{/* 
                    <Tabs>
                        <TabList>
                            <Tab>Posts</Tab>
                            {userID == id && <Tab>Saved</Tab>}
                        </TabList>

                        <TabPanel> */}
                            <div className="SavedPosts">
                                <h2>Your Posts</h2>
                                {posts ? posts.length == 0 ? <h3>No posts yet!</h3> : posts.map((post) => <ProfilePost fetchPosts={fetchUserPosts}editModal={editModal} setEditModal={setEditModal} editData={editData} setEditData={setEditData} setopen2={setopen2} post={post} setModal={setModal} savedPosts={savedPosts} setSavedPosts={setSavedPosts} fetchSavedPosts={fetchSavedPosts}/>) : <h6>Loading...</h6>}

                            </div>
                        {/* </TabPanel>
                        {userID == id && <TabPanel>
                            <div className="SavedPosts">
                                <h2> Your Saved Posts</h2>
                                {savedPosts?savedPosts.length==0?<h3>No posts found!</h3>:savedPosts.map((p)=>{
                                  return(<><ProfilePost fetchPosts={fetchSavedPosts} setopen2={setopen2} post={p} setModal={setModal} savedPosts={savedPosts} setSavedPosts={setSavedPosts} fetchSavedPosts={fetchSavedPosts}/></>)
                                }):<h3>Loading...</h3>}

                            </div>
                        </TabPanel>}
                    </Tabs> */}

                </div>
            </div>
            <div className="ProfileRight">
                <div className="ProfileRightHead" >Suggestions</div>
                <div className="SuggestList">
                    {profiles ? profiles.length == 0 ? <h3>No suggested profile found</h3> : profiles.sort(() => Math.random() - Math.random()).slice(0, 5).map((p) =>
                        <ProfileSuggest profile={p} />
                    ) : <h3>Loading...</h3>
                    }</div>
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

export default Profile
