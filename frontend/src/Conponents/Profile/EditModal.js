import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ProfileCover from "../../images/ProfileCover.png"
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

function EditModal({ open, setopen, user }) {
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [loading,setLoading]=useState(false)
    const [username, setusername] = useState("")
    const [userbio, setuserbio] = useState("")
    const [acadYear, setacadYear] = useState("")
    const [cover,setCover]=useState("");
    const [profile,setProfile]=useState("");
    const [Branch, setBranch] = useState("")
    const [College, setCollege] = useState("")
    const [profileImg, setprofileImg] = useState("")
    const [coverimage, setcoverimage] = useState("")
    const [form,setForm]=useState("");
    const ref = useRef()
    const ref2 = useRef()
    useEffect(() => {
      setForm(new FormData());
    }, [])


    return (
        <div className="EditModalcont">
            <Modal isOpen={open} portalClassName="editer" >
                <CloseIcon className="closeicon" onClick={() => setopen(0)} />
                <EditIcon onClick={() => ref.current.click()} className="editCover" />
                <img className="ProfileCover2" src={user?.coverImage || coverimage || ProfileCover} alt="" />
                <div className="ProfileInfo" >
                    <div className="ProfileInfoTop2">
                        <div>
                            <img className="ProfileAvatar2" src={profileImg || user?.profilePicture} alt=""></img>
                            <EditIcon onClick={() => ref2.current.click()} className="editProfileImg" />
                        </div>
                        <Button style={{marginRight:"40px"}} className="EditProfileButton" onClick={async(e)=>{
                          setLoading(true);
                          e.preventDefault();
                          if(cover){
                            form.set('coverImage',cover);
                          }
                          if(profile){
                            form.set('profilePicture',profile)
                          }
                          let resp = await axios.put(`/profile/${userID}`,form,{ headers: { "Content-Type": "multipart/form-data","Authorization" : `Bearer ${token}`} });
                          if(resp.data.message){
                            setLoading(false);
                            setopen(0)
                          }
                        }}>{loading?"Loading...":"Save Changes"}</Button>
                    </div>
                        <input className="hider" ref={ref} type="file" onChange={(e) => {setcoverimage(URL.createObjectURL(e.target.files[0])); setCover(e.target.files[0])}} />
                        <input className="hider" ref={ref2} type="file" onChange={(e) => {setprofileImg(URL.createObjectURL(e.target.files[0])); setProfile(e.target.files[0])}} />
                    <div className="editProfileTexts">
                        <TextField className="EditFields" variant="outlined" defaultValue={user?.name} label="User Name" onChange={(e) => {setusername(e.target.value); form.set('name',e.target.value)}} />
                        <TextField className="longfield" variant="outlined" defaultValue={user?.bio} label="Your Bio" onChange={(e) => {setuserbio(e.target.value); form.set('bio',e.target.value)}} />
                        <div>
                            <TextField className="EditFields" variant="outlined" defaultValue={user?.academicYear} label="Academic Year" onChange={(e) => {setacadYear(e.target.value); form.set('academicYear',e.target.value)}} />
                            <TextField className="EditFields" variant="outlined" defaultValue={user?.branch} label="Branch" onChange={(e) => {setBranch(e.target.value); form.set('branch',e.target.value)}} />
                            <TextField className="EditFields" variant="outlined" defaultValue={user?.college} label="College" onChange={(e) => {setCollege(e.target.value); form.set('college',e.target.value)}} />
                        </div>
                        <TextField className="longfield" variant="outlined" defaultValue={user?.bio} label="Followed Tags" onChange={(e) => {setuserbio(e.target.value); form.set('bio',e.target.value)}} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditModal
