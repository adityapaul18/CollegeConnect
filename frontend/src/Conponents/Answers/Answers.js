import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import ProfileSuggest from '../Profile/ProfileSuggest';
import './Answers.css'
import HomePost from '../Home/HomePost';
import PostAnswer from './PostAnswer';

function Answers() {
    return (
        <div className="ProfileContainer">
            <div className="ProfileLeft">
                <div className="ProfilePost" >
                    <div className="PostTop"><img alt="" className="PostLogo" src="https://qph.fs.quoracdn.net/main-thumb-282129127-200-wdsefxcvsewcnoifsgtqymhoydgblwha.jpeg" /><div><span className="PostHeadName">Aditya Paul</span><span className="PostHeadCollege">3rd year student at Indian Institute of Information Technology, Surat</span></div></div>
                    <div className="PostAnswer">
                        <h2>Question main heading here </h2>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        <div className="TagsBox">
                            <span className="TagSuggest">Web D </span>
                            <span className="TagSuggest">DSA</span>
                            <span className="TagSuggest">Google</span>
                        </div>
                    </div>
                </div>
                <h3>Answers</h3>
                <PostAnswer />
                <PostAnswer />
                <PostAnswer />
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

export default Answers
