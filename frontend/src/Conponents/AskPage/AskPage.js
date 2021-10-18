import React from 'react'
import './AskPage.css'
import ProfileSuggest from '../Profile/ProfileSuggest'
import AddIcon from '@material-ui/icons/Add';
import HomePost from '../Home/HomePost';
import { Button, TextField } from '@material-ui/core';

function AskPage() {
    return (
        <div className="AskPageContainer">
            <div className="ProfileLeft">
                <div className="AskBox" >
                    <TextField className="AskHeaders" variant="outlined" label="Add A Headeing" />
                    <TextField className="AskHeaders" variant="outlined" label="Add A Brief Description" multiline rows={15}/>
                    <div className="AskLowerBox">
                        <div className="SuggestdTagsBox">
                            <span className="TagSuggest"><input className="qTags" placeholder="Enter Tag1" /></span> 
                            <span className="TagSuggest"><input className="qTags" placeholder="Enter Tag2" /></span> 
                            <span className="TagSuggest"><input className="qTags" placeholder="Enter Tag3" /></span> 
                        </div>
                        <Button className="PostQButton" variant="contained">POST</Button>
                    </div>
                </div>
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

export default AskPage
