import React, { useEffect, useState } from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginIcon from '@material-ui/icons/ExitToApp';
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

    const logout = () => {
        localStorage.setItem("CConID", null)
        localStorage.setItem("CConUser", null)
        history.push("/login")
    }
    return (
        <div className="headerContainer" >
            <div className="headerContainerinner">College Connect</div>
            <div className="headerContainerinner"><span onClick={() => history.push('/home')}>Home</span><span onClick={() => history.push('/ask')}>Ask</span><span onClick={() => history.push('/saved')}>Saved</span></div>
            <div className="headerContainerinner">
              {user&&<> Welcome {user?.name.substring(0,user.name.indexOf(' '))}<Avatar className="HeaderAvatar" onClick={() => history.push('/profile')} src={user.profilePicture}/></>}
               {user?<PowerSettingsNewIcon onClick={logout}/>:<LoginIcon onClick={()=>{
                 history.push("/")
               }}/>}
                </div>
        </div>
    )
}

export default Header
