const User = require('../models/user');
const {isValidEmail,isPasswordStrong}=require('../utils/validators');
const firebase=require("firebase");
const firebaseConfig = require("../utils/firebaseConfig");
if( firebase.apps.length === 0 ){
   firebase.initializeApp(firebaseConfig);
}

exports.register=async(req, res)=>{
  try{
    let { firstName, lastName, email, password } = req.body;

    // validations
    if(!firstName||firstName=="") return res.status(400).json({error:'First name is required'});
    if(!lastName||lastName=="") return res.status(400).json({error:'Last name is required'});
    if(!email||email=="") return res.status(400).json({error:'Email is required'});
    if(!isValidEmail(email)) return res.status(400).json({error:'Email is invalid'});
    if(!password||password=="") return res.status(400).json({error:'Password is required'});
    if(!isPasswordStrong(password)) return res.status(400).json({error:'Password is not strong enough'});

    // check if user already exists
    let existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({error:'This user already exists'});

     // firebase auth
     let data=await firebase.auth().createUserWithEmailAndPassword(email,password);
     if(!data) return res.status(400).json({error:'Something went wrong'});
     let token =await data.user.getIdToken();

     // save user to db
     let newUser=await new User({firstName,lastName,email}).save();
     res.status(200).json({
       message:'Registered user successfully',
       token,
       user: newUser
     })



  }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong!"})
  }
}

exports.login=async(req, res) => {
  try{
    let { email, password } = req.body;

    // validations
    if(!email||email=="") return res.status(400).json({error:'Email is required'});
    if(!isValidEmail(email)) return res.status(400).json({error:'Email is invalid'});
    if(!password||password=="") return res.status(400).json({error:'Password is required'});

    let data = await firebase.auth().signInWithEmailAndPassword(email,password);
    if(!data) return res.status(400).json({error:'Something went wrong'});
    let token = await data.user.getIdToken();

    let user = await User.findOne({email});
    res.status(200).json({
      message:'LoggedIn user successfully',
      token,
      user
    })

  }catch(error){
    console.log(error);
    res.status(403).json({error:"Wrong credential, please try again"})
  }
}
