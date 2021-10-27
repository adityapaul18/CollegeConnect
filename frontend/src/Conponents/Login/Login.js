import React, { useEffect, useState } from 'react'
import { Avatar, Button, IconButton, MenuItem, TextField } from '@material-ui/core'
import './Login.css'
import loginLogo from "../../images/loginlogo.png"
import { auth, provider } from '../../utils/Firebase'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
    var user = localStorage.getItem("CConUser")

    const history = useHistory()

    const ff = () => {
        if (user !== "null")
            history.push('/')
    }

    useEffect(() => {
        ff()
    }, [])

    const signin = async (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
            .then(async(resp) => {
                const token = await resp.user.getIdToken();
                console.log(token)
                const name = resp.user.displayName;
                const email = resp.user.email;
                axios.post('/google/login', { name, email, token })
                .then((res) => {
                    console.log(res.data)
                        localStorage.setItem("CConID", res.data.existingUser._id)
                        localStorage.setItem("CConUser", res.data.token)
                        history.push('/home')
                        // alert(res.data.message)
                    })

            })
            .catch((err) => alert("something went wrong"))
    }

    const signin2 = (e) => {
      setLoading(true);
        e.preventDefault();
        const email = mail
        const password = Password
        axios.post('/login',{ email, password })
        .then((res) => {
            setLoading(false);
            localStorage.setItem("CConUser", res.data.token)
            localStorage.setItem("CConID", res.data.user._id)
            // alert(res.data.message)
            history.push('/home')
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            text: err.response.data.error
          })
        })

    }

    const signup = async (e) => {
        setLoading(true);
        e.preventDefault();
        const name = username
        const email = mail
        const password = Password
        axios.post('/register',{ name, email, password,confirmPassword:passwordc })
        .then((res) => {
            localStorage.setItem("CConUser", res.data.token)
            localStorage.setItem("CConID", res.data.user._id);
            setLoading(false);
            history.push('/home')
        })
        .catch((err) =>{
          setLoading(false);
          Swal.fire({
            icon: 'error',
            text: err.response.data.error
          })

         })

    }
    const [mail, setmail] = useState("")
    const [username, setusername] = useState("")
    const [profilepic, setprofilepic] = useState("")
    const [Password, setPassword] = useState("")
    const [passwordc, setpasswordc] = useState("")
    const [set, setset] = useState(0);
    const [error,setError]=useState(false);
    const [loading,setLoading] = useState(false);
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
                            <Button className="Loginbtn" variant="contained" onClick={signup}>{loading?"Loading...":"Sign up"}</Button>
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
                            <Button className="Loginbtn" variant="contained" onClick={signin2}>{loading?"Loading...":"Login"}</Button>
                            <Button className="Loginbtn2" variant="contained" onClick={signin}><img style={{ height: "15px", padding: "0 5px" }} src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="" />Login with Google</Button>
                            <Button className="Loginbtn2" onClick={() => history.push('/home')}>Continue Anonymously</Button>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "80px" }} >Not having an account ? <IconButton onClick={() => setset(1)}><span style={{ color: "rgb(0, 106, 255)", cursor: "pointer", fontSize: "15px" }} >Sign up</span></IconButton></div>
                        </>
                }

            </div>
        </div>
    )
}

export default Login
