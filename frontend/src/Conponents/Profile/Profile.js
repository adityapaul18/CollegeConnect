import React from 'react' 
import { Avatar } from '@material-ui/core'
import ProfileCover from "../../images/ProfileCover.png"
import AddIcon from '@material-ui/icons/Add';
import './Profile.css'

function Profile() {
    return (
        <div className="ProfileContainer">
            <div className="ProfileLeft">
                <img className="ProfileCover" src={ProfileCover} alt=""/>
                <div>
                    <div>
                    <Avatar className="SuggestAvatar"></Avatar>
                    </div>

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
                    <span className="TagSuggest">CP <AddIcon/></span>
                    <span className="TagSuggest">Flutter<AddIcon/></span>
                    <span className="TagSuggest">PayTm<AddIcon/></span>
                    </div>
                <div className="SuggestdTagsBox">
                    <span className="TagSuggest">Web D <AddIcon/></span>
                    <span className="TagSuggest">DSA<AddIcon/></span>
                    <span className="TagSuggest">Google<AddIcon/></span>
                    </div>
                <div className="SuggestdTagsBox">
                    <span className="TagSuggest">Photography<AddIcon/></span>
                    <span className="TagSuggest">IIIT<AddIcon/></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
