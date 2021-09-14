import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import './Header.css';
import { Avatar } from '@material-ui/core';

function Header() {
    return (
        <div className="headerContainer" >
            <div className="headerContainerinner">College Connect</div>
            <div className="headerContainerinner"><span>Home</span><span>Write</span><span>Saved</span></div>
            <div className="headerContainerinner"><NotificationsNoneIcon/> <span><Avatar src="https://qph.fs.quoracdn.net/main-thumb-282129127-200-wdsefxcvsewcnoifsgtqymhoydgblwha.jpeg"/></span></div>
        </div>
    )
}

export default Header
