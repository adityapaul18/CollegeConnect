import { Avatar } from '@material-ui/core'
import React from 'react'

function ProfileSuggest() {
    return (
        <div className="ProflieSuggest">
            <Avatar className="SuggestAvatar"></Avatar>
            <div>
                <div className="SuggestName">Rahul Goel</div>
                <div className="Suggestcollege" >Indian Institute of Technology ,Goa</div>
            </div>
        </div>
    )
}

export default ProfileSuggest
