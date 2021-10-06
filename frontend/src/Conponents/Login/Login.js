import React, { useEffect, useState } from 'react'
import { Avatar, Button, IconButton, MenuItem, TextField } from '@material-ui/core'
import './Login.css'
import loginLogo from "../../images/loginlogo.png"
import { auth, provider } from '../../utils/Firebase'
import { useHistory } from 'react-router-dom';
import axios from "axios";

function Login() {
    var user = localStorage.getItem("CConUser")

    const history = useHistory()

    const ff = () => {
        if (user)
            history.push('/profile')
    }

    useEffect(() => {
        ff()
    }, [])

    const signin = async (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
            .then((res) => {
                const token = res.credential.accessToken;
                const name = res.user.displayName;
                const email = res.user.email;
                axios.post('/google/login', { name, email, token })
                    .then((res) => {
                        console.log(res.data)
                        localStorage.setItem("CConUser", res.data.token)
                        history.push('/profile')
                        // alert(res.data.message)
                    })
                    .catch((err) => alert("something went wrong"))
            })
            .catch((err) => alert("something went wrong"))
    }

    const signin2 = (e) => {
        e.preventDefault();
        if( mail==="" || Password==="" || !/\S/.test(mail)|| !/\S/.test(Password)){
            alert("Please fill in the feilds correctly")
            return;
        }
        const email = mail
        const password = Password
        axios.post('/login',{ email, password })
        .then((res) => {
            console.log(res.data)
            localStorage.setItem("CConUser", res.data.token)
            // alert(res.data.message)
            history.push('/profile')
        })
        .catch((err) => alert("Credentials do not match"))  

    }

    const signup = async (e) => {
        e.preventDefault();
        if(Password !== passwordc ){
            alert("Both passwords should match , Please fill in the feilds correctly")
            return;
        }
        if(!username || mail==="" || Password==="" || passwordc==="" || !/\S/.test(username)|| !/\S/.test(mail)|| !/\S/.test(Password)|| !/\S/.test(passwordc)){
            alert("Please fill in all the feilds correctly")
            return;
        }
        const name = username
        const email = mail
        const password = Password
        axios.post('/register',{ name, email, password })
        .then((res) => {
            console.log(res.data)
            localStorage.setItem("CConUser", res.data.token)
            alert(res.data.message)
            history.push('/profile')
        })
        .catch((err) => console.log(err))      

    }
    const [mail, setmail] = useState("")
    const [username, setusername] = useState("")
    const [profilepic, setprofilepic] = useState("")
    const [Password, setPassword] = useState("")
    const [passwordc, setpasswordc] = useState("")
    const [set, setset] = useState(0)
    return (
        <div className="LoginContainer">
            <div>
                <img className="LoginImg" src={loginLogo} alt="" />
            </div>
            <div className="logininfo">
                {
                    set === 1 ?
                        <>
                            <div className="LoginHead">
                                Welcome To College Connect
                                <div style={{ fontSize: "26px", fontWeight: "700" }} >Create your account</div>
                            </div>
                            <div className="LoginForm">
                                <div className="LoginHead">Name</div>
                                <TextField value={username} onChange={(e) => setusername(e.target.value)} className="LoginFilters" placeholder="name" variant="outlined" />
                                <div className="LoginHead">Email</div>
                                <TextField value={mail} onChange={(e) => setmail(e.target.value)} className="LoginFilters" placeholder="email" variant="outlined" />
                                <div className="LoginHead">Password</div>
                                <TextField value={Password} type="password" onChange={(e) => setPassword(e.target.value)} className="LoginFilters" placeholder="password" variant="outlined" />
                                <div className="LoginHead">Confirm Password</div>
                                <TextField value={passwordc} type="password" onChange={(e) => setpasswordc(e.target.value)} className="LoginFilters" placeholder="confirm password" variant="outlined" />
                            </div>
                            <Button className="Loginbtn" variant="contained" onClick={signup}>Sign up</Button>
                            <Button className="Loginbtn2" variant="contained" onClick={signin}><img style={{ height: "15px", padding: "0 5px" }} src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="" />Login with Google</Button>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "40px" }} >Already having an account ? <IconButton onClick={() => setset(0)} ><span style={{ color: "rgb(0, 106, 255)", cursor: "pointer", fontSize: "15px" }} >Login</span></IconButton></div>
                        </>
                        :
                        <>
                            <div className="LoginHead">
                                Welcome Back
                                <div style={{ fontSize: "26px", fontWeight: "700" }} >Login to your account</div>
                            </div>
                            <div className="LoginForm">
                                <div className="LoginHead">Email</div>
                                <TextField value={mail} onChange={(e) => setmail(e.target.value)} className="LoginFilters" placeholder="email" variant="outlined" />
                                <div className="LoginHead">Password</div>
                                <TextField value={Password} type="password" onChange={(e) => setPassword(e.target.value)} className="LoginFilters" placeholder="password" variant="outlined" />
                            </div>
                            <div className="LoginFormlow"> <span><input type="checkbox" /> Remember me</span>  <span style={{ color: "rgb(0, 92, 251)", cursor: "pointer" }}>Forgot Password?</span></div>
                            <Button className="Loginbtn" variant="contained" onClick={signin2}>Login</Button>
                            <Button className="Loginbtn2" variant="contained" onClick={signin}><img style={{ height: "15px", padding: "0 5px" }} src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="" />Login with Google</Button>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "80px" }} >Not having an account ? <IconButton onClick={() => setset(1)}><span style={{ color: "rgb(0, 106, 255)", cursor: "pointer", fontSize: "15px" }} >Sign up</span></IconButton></div>
                        </>
                }

            </div>
        </div>
    )
}

export default Login
