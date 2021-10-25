import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ProfileCover from "../../images/ProfileCover.png"
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
function AnswerModal({open,setopen}) {
    return (
        <div>
            <Modal isOpen={open} portalClassName="answermodal">
                <div className="ansContainer">
                    <CloseIcon className="close" onClick={() => setopen(0)} />
                    <TextField className="AskHeaders" variant="outlined" multiline rows={2} value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard" />
                    <TextField className="AskHeaders" variant="outlined" label="Add Your Answer" multiline rows={15}/>
                    <div className="AddAnswerCont" >
                    <Button className="AnswerButton" variant="contained">Add Image</Button>
                    <Button className="AnswerButton" variant="contained">post</Button>
                    </div>
                    <div className="AnsImgsCont" >
                        <img src="https://media.istockphoto.com/photos/wizard-falls-on-the-metolius-river-autumn-in-oregon-picture-id1282389397?b=1&k=20&m=1282389397&s=170667a&w=0&h=stKW8obWC5j7xyeFHikgDHsqoZQ0B4WJN_9MBGCxVQw=" alt="" />
                        <img src="https://media.istockphoto.com/photos/wizard-falls-on-the-metolius-river-autumn-in-oregon-picture-id1282389397?b=1&k=20&m=1282389397&s=170667a&w=0&h=stKW8obWC5j7xyeFHikgDHsqoZQ0B4WJN_9MBGCxVQw=" alt="" />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AnswerModal
