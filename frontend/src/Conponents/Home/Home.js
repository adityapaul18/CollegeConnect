import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfilePost from '../Profile/ProfilePost';
import ProfileSuggest from '../Profile/ProfileSuggest';
import HomePost from './HomePost';
import { useHistory } from 'react-router';
import AnswerModal from './AnswerModal';

function Home() {
    const history = useHistory()
    const [open, setopen] = useState(0)
    return (
        <div className="ProfileContainer">
            <AnswerModal open={open} setopen={setopen} />
            <div className="ProfileLeft">
                <HomePost setopen={setopen}/>
                <HomePost setopen={setopen}/>
                <HomePost setopen={setopen}/>
                <HomePost setopen={setopen}/>
                <HomePost setopen={setopen}/>
                <HomePost setopen={setopen}/>
                <HomePost setopen={setopen}/>
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
