import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import ProfileCover from "../../images/ProfileCover.png"
import AddIcon from '@material-ui/icons/Add';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import './Profile.css'

function Profile() {
    return (
        <div className="ProfileContainer">
            <div className="ProfileLeft">
                <img className="ProfileCover" src={ProfileCover} alt="" />
                <div className="ProfileInfo" >
                    <div className="ProfileInfoTop">
                        <Avatar className="ProfileAvatar" src="https://qph.fs.quoracdn.net/main-thumb-282129127-200-wdsefxcvsewcnoifsgtqymhoydgblwha.jpeg" ></Avatar>
                        <Button className="EditProfileButton">Edit Profile</Button>
                    </div>
                    <div className="ProfileInfoBottom">
                        <b>Aditya Paul</b>
                        <div className="ProfileSubInfo">@NoobMaster</div>
                        <div className="ProfileSubInfo">19 | Like Designing and Wrintig blogs</div>
                        <div className="ProfileSubInfo">2nd year student at Indian Institute of Information Technology, Surat</div>
                    </div>
                    <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
                </div>
            </div>
            <div className="ProfileRight">
                <div className="ProfileRightHead" >Suggestions</div>
                <div className="ProflieSuggest">
                    <Avatar className="SuggestAvatar"></Avatar>
                    <div>
                        <div className="SuggestName">Rahul Goel</div>
                        <div className="Suggestcollege" >Indian Institute of Technology ,Goa</div>
                    </div>
                </div>
                <div className="ProflieSuggest">
                    <Avatar className="SuggestAvatar"></Avatar>
                    <div>
                        <div className="SuggestName">Rahul Goel</div>
                        <div className="Suggestcollege" >Indian Institute of Technology ,Goa</div>
                    </div>
                </div>
                <div className="ProflieSuggest">
                    <Avatar className="SuggestAvatar"></Avatar>
                    <div>
                        <div className="SuggestName">Rahul Goel</div>
                        <div className="Suggestcollege" >Indian Institute of Technology ,Goa</div>
                    </div>
                </div>
                <div className="ProflieSuggest">
                    <Avatar className="SuggestAvatar"></Avatar>
                    <div>
                        <div className="SuggestName">Rahul Goel</div>
                        <div className="Suggestcollege" >Indian Institute of Technology ,Goa</div>
                    </div>
                </div>
                <div className="ProflieSuggest">
                    <Avatar className="SuggestAvatar"></Avatar>
                    <div>
                        <div className="SuggestName">Rahul Goel</div>
                        <div className="Suggestcollege" >Indian Institute of Technology ,Goa</div>
                    </div>
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
                        <span className="TagSuggest">Photography<AddIcon /></span>
                        <span className="TagSuggest">IIIT<AddIcon /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
