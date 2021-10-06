import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import './Header.css';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';

function Header() {
    const history = useHistory()
    return (
        <div className="headerContainer" >
            <div className="headerContainerinner">College Connect</div>
            <div className="headerContainerinner"><span onClick={() => history.push('/home')}>Home</span><span>Write</span><span>Saved</span></div>
            <div className="headerContainerinner"><NotificationsNoneIcon/> <Avatar className="HeaderAvatar" onClick={() => history.push('/profile')} src="https://qph.fs.quoracdn.net/main-thumb-282129127-200-wdsefxcvsewcnoifsgtqymhoydgblwha.jpeg"/></div>
        </div>
    )
}

export default Header
