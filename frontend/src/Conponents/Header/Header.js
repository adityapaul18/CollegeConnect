import React, { useEffect, useState } from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import './Header.css';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';
import axios from 'axios';

function Header() {
    const history = useHistory()
    const userID = localStorage.getItem("CConID")
    const [user, setuser] = useState("")
    useEffect(() => {
        axios.get(`/profile/single/${userID}`)
        .then((res) => {
            console.log(res.data.user)
            setuser(res.data.user)
        })
    }, [])
    return (
        <div className="headerContainer" >
            <div className="headerContainerinner">College Connect</div>
            <div className="headerContainerinner"><span onClick={() => history.push('/home')}>Home</span><span onClick={() => history.push('/ask')}>Ask</span><span>Saved</span></div>
            <div className="headerContainerinner"><NotificationsNoneIcon/> <Avatar className="HeaderAvatar" onClick={() => history.push('/profile')} src={user.profilePicture}/></div>
        </div>
    )
}

export default Header
