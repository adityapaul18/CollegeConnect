import React, { useState } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollection } from 'react-firebase-hooks/firestore'
// import { auth, db } from '../../Firebase'
import './Profile.css'
// import Chirp from '../Chirps/Chirp';
import { Avatar, Button } from '@material-ui/core'
import { useHistory } from 'react-router'
// import Spinner from 'react-spinkit'
// import Thoughtbox from '../Thougthbox/Thoughtbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



function Profilepage() {

    // const [myuser] = useAuthState(auth);
    // const [chirps,loading] = useCollection(db.collection("messages").orderBy("timestamp","desc"))
    // const cutdate3 = (str) => {
    //     let l = str.length
    //     return str.substr(0, l-12) ;
    // };
    // const dd3 = myuser?.metadata.creationTime

    const history = useHistory();
    // const signout = () => {
    //     auth.signOut();
    // }

    const [modalIsOpen,setIsOpen] = useState(false);
    const [chirpid, setchirpid] = useState("PLJe0D0DWrrXmAbJP2g8")
    return (
        <div className="profile__page">
            <div className="profilecontainer" style={{zIndex:modalIsOpen? 0 : 2}} >
                <Avatar className="profile_avatar2" src={"https://qph.fs.quoracdn.net/main-thumb-282129127-200-wdsefxcvsewcnoifsgtqymhoydgblwha.jpeg"} ></Avatar>
            </div> 
            <div className="hidder">            </div>
            <div className="profile_lower">
                
            <div className="profile-left" style={{zIndex:modalIsOpen? 0 : 2}} >        
                <Avatar className="profile_avatar" src="https://qph.fs.quoracdn.net/main-thumb-282129127-200-wdsefxcvsewcnoifsgtqymhoydgblwha.jpeg" >f</Avatar>
                <Button onClick={() => {history.push("./")}} variant="contained">Home</Button>
                <Button onClick={() => {history.push("./profile")}} variant="contained">Profile</Button>
                <Button variant="contained"><a href="https://github.com/adityapaul18/Chirps">Github</a></Button>
                <Button variant="contained"><a href="https://adityapaul.herokuapp.com/">Contact</a></Button>
            
                <div className="logoutbtn">
                <Button cariant="contained" >logout</Button>
                    <div>Made By Aditya Paul</div> 
                </div>
                

            </div>

            <div className="prof-mid">
            
            </div>
            <div className="profile-right" >
                <span><ExpandMoreIcon/></span>
                {/* <Thoughtbox/> */}
            </div>
            
        </div>
        </div>
    )
}

export default Profilepage
