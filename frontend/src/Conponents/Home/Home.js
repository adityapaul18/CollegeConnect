import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import ProfileCover from "../../images/ProfileCover.png"
import AddIcon from '@material-ui/icons/Add';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import './Profile.css'
import ProfilePost from '../Profile/ProfilePost';
import ProfileSuggest from '../Profile/ProfileSuggest';

function Home() {
    return (
        <div className="ProfileContainer">
            <div className="ProfileLeft">
                <ProfilePost />
                <ProfilePost />
                <ProfilePost />
                <ProfilePost />
                <ProfilePost />
            </div>
            <div className="ProfileRight">
                <div className="ProfileRightHead" >Suggestions</div>
                <ProfileSuggest />
                <ProfileSuggest />
                <ProfileSuggest />
                <ProfileSuggest />
                <ProfileSuggest />
                <ProfileSuggest />
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

export default Home
