import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import './Header.css';
import { Avatar } from '@material-ui/core';

function Header() {
    return (
        <div className="headerContainer" >
            <div className="headerContainerinner">College Connect</div>
            <div className="headerContainerinner"><span>Home</span><span>Write</span><span>Saved</span></div>
            <div className="headerContainerinner"><NotificationsNoneIcon/> <span><Avatar/></span></div>
        </div>
    )
}

export default Header
