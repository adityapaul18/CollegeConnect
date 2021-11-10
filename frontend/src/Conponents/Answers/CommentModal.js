import React from 'react'
import ReactModal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { Avatar, Button, TextField } from '@material-ui/core';

function CommentModal({open,setopen}) {
    return (
        <div>
            <ReactModal isOpen={open} portalClassName="answermodal">
                <CloseIcon className="close" onClick={() => setopen(0)} />
                <div className="commentContainer">
                    <div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                        <div className="comment">
                            <Avatar/>
                            <div>
                                 fjksdbf  j sjfjksfjsfhs jffs   hsjfhdfhsjfh s hkjfskhfh 
                            </div>
                        </div>
                    </div>
                    <div className="commentMaker" >
                        <TextField variant="outlined"/>
                        <Button className="CommentButton"><SendIcon/></Button>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

export default CommentModal
