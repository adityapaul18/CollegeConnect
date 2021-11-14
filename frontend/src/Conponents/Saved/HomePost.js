import { Button } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useHistory } from 'react-router';
import BookmarkIcon from '@material-ui/icons/Bookmark';


function HomePost({setopen}) {
    const history = useHistory()
    return (
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
                <div className="ShowAnswers" > <span onClick={() => setopen(1)}>Write Answer</span> <span onClick={() => history.push('/answers')}> Show Answers </span></div>
            </div>
        </div>
    )
}

export default HomePost
