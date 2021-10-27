import { Avatar } from '@material-ui/core'
import React from 'react';
import {Link} from "react-router-dom";

function ProfileSuggest({profile}) {
    return (
        <div className="ProflieSuggest">
            <img  className="SuggestAvatar" src={profile.profilePicture}></img>
            <div>
                <div className="SuggestName"><Link to ={{pathname:'/profile',state:profile._id}} style={{textDecoration:"none"}}>{profile.name}</Link></div>
                <div className="Suggestcollege" >{profile.college}</div>
            </div>
        </div>
    )
}

export default ProfileSuggest
