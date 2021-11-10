import React, { useEffect, useState } from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import './Header.css';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';
import axios from 'axios';

function Header() {
    const history = useHistory()
    const userID = localStorage.getItem("CConID");
    const token = localStorage.getItem("CConUser");
    const [user, setuser] = useState("")
    useEffect(() => {
      if(userID){
        axios.get(`/profile/single/${userID}`)
        .then((res) => {
            setuser(res.data.user)
        })
      }

    }, [])

    const logout = () => {
        localStorage.removeItem("CConID")
        localStorage.removeItem("CConUser")
        history.push("/login")
    }
    return (<>
        <div className="headerContainer" >
            <div className="headerContainerinner">College Connect</div>
            <div className="headerContainerinner"><span onClick={() => history.push('/home')}>Home</span>{token&&<span onClick={() => history.push('/ask')}>Ask</span>}<span onClick={() => history.push('/saved')}>Saved</span></div>
            <div className="headerContainerinner">
              {user&&<> Welcome {user?.name.substring(0,user.name.indexOf(' '))}<Avatar className="HeaderAvatar" onClick={() => history.push({
                                  pathname: '/profile',
                                state: userID
                      })} src={user.profilePicture}/></>}
               {user?<PowerSettingsNewIcon onClick={logout}/>:<LoginIcon onClick={()=>{
                 history.push("/")
               }}/>}
                </div>
        </div>
        <div className="headerContainer2" >
            <div className="headerContainerinner"><span onClick={() => history.push('/home')}><HomeIcon/></span></div>
            <div className="headerContainerinner">{token&&<span onClick={() => history.push('/ask')}><EmojiPeopleIcon/></span>}</div>
            <div className="headerContainerinner"><span onClick={() => history.push('/saved')}><TurnedInIcon/></span></div>
            <div className="headerContainerinner">

               {user?<PowerSettingsNewIcon onClick={logout}/>:<LoginIcon onClick={()=>{
                 history.push("/")
                }}/>}
                </div>
                <div className="headerContainerinner">
                {user&&<><Avatar className="HeaderAvatar" onClick={() => history.push({
                                    pathname: '/profile',
                                  state: userID
                        })} src={user.profilePicture}/></>}
                </div>
        </div>
        </>
    )
}

export default Header
