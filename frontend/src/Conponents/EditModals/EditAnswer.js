import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ProfileCover from "../../images/ProfileCover.png"
import axios from 'axios';
import Swal from "sweetalert2";
import { Button, TextField } from '@material-ui/core';
function EditAnswer({postId,answer,editAnswerModal,setEditAnswerModal,fetchSinglePost}) {
  const userID = localStorage.getItem("CConID");
  const token = localStorage.getItem("CConUser");
  const [editPost,setEditPost]=useState({
    description:""
  });

  const {description}=editPost;
  useEffect(()=>{
    setEditPost({
      description:answer.description
    })
  },[])

    return (
        <div>
            <Modal isOpen={editAnswerModal} portalClassName="answermodal">
                <div className="ansContainer">
                    <CloseIcon className="close" onClick={() => setEditAnswerModal(0)} />

                    <TextField className="AskHeaders" variant="outlined" multiline rows={15} value={description}
                    onChange={(e)=>{
                      setEditPost({...editPost,description:e.target.value})
                    }}
                    />
                    <div  >
                    <div>
                    {/*}<Button onClick={() => ref.current.click()} className="PostQButton" >add image</Button>
                    <input ref={ref} className="AskHeaders hider" variant="outlined" type="file" onChange={(e)=>setImages(e.target.files)}/>
                    {/*}<Button className="AnswerButton" variant="contained">Add Image</Button>*/}
                    <Button className="AnswerButton" variant="contained"
                    onClick={async(e)=>{
                      e.preventDefault();

                        try{
                          let resp = await axios.put(`/answer/${postId}/${answer._id}`,editPost,{ headers: { "Authorization" : `Bearer ${token}`} });
                          if(resp.data.message){
                            setEditPost({description:""});
                            setEditAnswerModal(0);
                            fetchSinglePost();
                        }
                      }catch(err){

                        Swal.fire({
                          icon: 'error',
                          text: err.response.data.error
                        })
                      }

                    }}
                    >Edit</Button>
                    </div>
                    </div>
                  {/*}  <div className="AnsImgsCont" >
                        <img src="https://media.istockphoto.com/photos/wizard-falls-on-the-metolius-river-autumn-in-oregon-picture-id1282389397?b=1&k=20&m=1282389397&s=170667a&w=0&h=stKW8obWC5j7xyeFHikgDHsqoZQ0B4WJN_9MBGCxVQw=" alt="" />
                        <img src="https://media.istockphoto.com/photos/wizard-falls-on-the-metolius-river-autumn-in-oregon-picture-id1282389397?b=1&k=20&m=1282389397&s=170667a&w=0&h=stKW8obWC5j7xyeFHikgDHsqoZQ0B4WJN_9MBGCxVQw=" alt="" />
                    </div>*/}
                </div>
            </Modal>
        </div>
    )
}

export default EditAnswer
