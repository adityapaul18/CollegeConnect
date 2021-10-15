import React, { useLayoutEffect, useState } from 'react'
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import ProfileCover from "../../images/ProfileCover.png"
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

function EditModal({ open, setopen }) {
    const userID = localStorage.getItem("CConID")
    const [user, setuser] = useState("")
    const [username, setusername] = useState("")
    const [userbio, setuserbio] = useState("")
    const [acadYear, setacadYear] = useState("")
    const [Branch, setBranch] = useState("")
    const [College, setCollege] = useState("")
    const [profileImg, setprofileImg] = useState("")
    const [coverimage, setcoverimage] = useState("")
    useLayoutEffect(() => {
        axios.get(`/profile/single/${userID}`)
            .then((res) => {
                console.log(res.data.user)
                setuser(res.data.user)
            })
    }, [])

    return (
        <div>
            <Modal isOpen={open}>
                <CloseIcon className="closeicon" onClick={() => setopen(0)} />
                <EditIcon className="editCover" />
                <img className="ProfileCover2" src={coverimage || ProfileCover} alt="" />
                <div className="ProfileInfo" >
                    <div className="ProfileInfoTop">
                        <div>
                            <img className="ProfileAvatar" src={profileImg || user?.profilePicture} alt=""></img>
                            <EditIcon className="editProfileImg" />
                        </div>
                        <Button style={{marginRight:"70px"}} className="EditProfileButton" >Save Profile</Button>
                    </div>
                    <div className="editProfileTexts">
                        <TextField className="EditFields" variant="outlined" defaultValue={user?.name} label="User Name" onChange={(e) => setusername(e.target.value)} />
                        <TextField className="EditFields" variant="outlined" defaultValue={user?.bio} label="Your Bio" onChange={(e) => setuserbio(e.target.value)} />
                        <div>
                            <TextField className="EditFields" variant="outlined" defaultValue={user?.acadwemicYear} label="Accademic Year" onChange={(e) => setacadYear(e.target.value)} />
                            <TextField className="EditFields" variant="outlined" defaultValue={user?.branch} label="Branch" onChange={(e) => setBranch(e.target.value)} />
                            <TextField className="EditFields" variant="outlined" defaultValue={user?.college} label="College" onChange={(e) => setCollege(e.target.value)} />
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditModal
