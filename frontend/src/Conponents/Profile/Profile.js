import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@material-ui/core'
import ProfileCover from "../../images/ProfileCover.png"
import AddIcon from '@material-ui/icons/Add';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import './Profile.css'
import ProfilePost from './ProfilePost';
import ProfileSuggest from './ProfileSuggest';
import axios from 'axios';
import EditModal from './EditModal';

function Profile() {

    const userID = localStorage.getItem("CConID")
    const [open, setopen] = useState(0)
    const [user, setuser] = useState("")
    useEffect(() => {
        axios.get(`/profile/single/${userID}`)
        .then((res) => {
            console.log(res.data.user)
            setuser(res.data.user)
        })
    }, [])


    return (
        <div className="ProfileContainer">
            <EditModal open={open} setopen={setopen}/>
            <div className="ProfileLeft">
                <img className="ProfileCover" src={ProfileCover} alt="" />
                <div className="ProfileInfo" >
                    <div className="ProfileInfoTop">
                        <img className="ProfileAvatar" src={user.profilePicture} alt=""></img>
                        <Button className="EditProfileButton" onClick={() => setopen(1)} >Edit Profile</Button>
                    </div>
                    <div className="ProfileInfoBottom">
                        <b>{user.name}</b>
                        <div className="ProfileSubInfo"><b>{user?.bio}</b></div>
                        <div className="ProfileSubInfo">{user?.college}</div>
                        <div className="ProfileSubInfo">{user?.branch}</div>
                        <div className="ProfileSubInfo">{user?.academicYear}</div>
                    </div>
                    <Tabs>
                        <TabList>
                            <Tab>Posts</Tab>
                            <Tab>Saved</Tab>
                        </TabList>

                        <TabPanel>
                        <div className="SavedPosts">
                            <h2>Your Posts</h2>
                            <ProfilePost />
                            <ProfilePost />
                            <ProfilePost />
                        </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="SavedPosts">
                            <h2> Your Saved Posts</h2>
                            <ProfilePost />
                            {/* <ProfilePost /> */}
                            </div>
                        </TabPanel>
                    </Tabs>

                </div>
            </div>
            <div className="ProfileRight">
                <div className="ProfileRightHead" >Suggestions</div>
                <div className="SuggestList">
                <ProfileSuggest/>
                <ProfileSuggest/>
                <ProfileSuggest/>
                <ProfileSuggest/>
                <ProfileSuggest/>
                <ProfileSuggest/>
                <ProfileSuggest/>
                <ProfileSuggest/>
                <ProfileSuggest/>
                </div>
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
    )
}

export default Profile
