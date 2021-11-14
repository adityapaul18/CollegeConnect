import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ProfileCover from "../../images/ProfileCover.png"
import axios from 'axios';
import Swal from "sweetalert2";
import { Button, TextField } from '@material-ui/core';
function AnswerModal({open,setopen,modal,setModal}) {
  const userID = localStorage.getItem("CConID");
  const token = localStorage.getItem("CConUser");
  const [description,setDescription]=useState("");
  const [images,setImages]=useState([]);
  const [loading,setLoading]=useState(false);
  const [form,setForm]=useState("");
  const ref = useRef()
  useEffect(()=>{
    setForm(new FormData())
  },[])

    return (
        <div>
            <Modal isOpen={open} portalClassName="answermodal">
                <div className="ansContainer">
                    <CloseIcon className="close" onClick={() => setopen(0)} />
                    <TextField className="AskHeaders" variant="outlined" multiline rows={2} value={modal&&modal.question.title} />
                    <TextField className="AskHeaders" variant="outlined" label="Add Your Answer" multiline rows={15}
                    onChange={(e)=>{
                      setDescription(e.target.value);
                      form.set('description',e.target.value)
                    }}
                    />
                    <div  >
                    <div>
                    <Button onClick={() => ref.current.click()} className="PostQButton" >add image</Button>
                    <input ref={ref} className="AskHeaders hider" variant="outlined" type="file" onChange={(e)=>setImages(e.target.files)}/>
                    {/*}<Button className="AnswerButton" variant="contained">Add Image</Button>*/}
                    <Button className="AnswerButton" variant="contained"
                    onClick={async(e)=>{
                      setLoading(true);
                      e.preventDefault();
                       if (images) {
                         for (const key of Object.keys(images)) {
                           form.set("images", images[key]);
                          }
                        }
                        try{
                          let resp = await axios.put(`/answer/${modal._id}`,form,{ headers: { "Authorization" : `Bearer ${token}`} });
                          if(resp.data.message){
                            setLoading(false);
                          setopen(0)
                        }
                      }catch(err){
                        setLoading(false);
                        Swal.fire({
                          icon: 'error',
                          text: err.response.data.error
                        })
                      }
                      
                    }}
                    >Post</Button>
                    </div>
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
