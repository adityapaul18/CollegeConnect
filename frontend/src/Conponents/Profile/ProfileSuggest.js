import { Avatar } from '@material-ui/core'
import React from 'react'

function ProfileSuggest({profile}) {
    return (
        <div className="ProflieSuggest">
            <Avatar  className="SuggestAvatar"><img src={profile.profilePicture}/></Avatar>
            <div>
                <div className="SuggestName">{profile.name}</div>
                <div className="Suggestcollege" >{profile.college}</div>
            </div>
        </div>
    )
}

export default ProfileSuggest
