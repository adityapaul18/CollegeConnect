const {auth} = require("../utils/admin");
const User = require("../models/user");

module.exports = async(req, res, next) => {
  try{
    let token;
  if(req.headers.authorization&&req.headers.authorization.startsWith(`Bearer `)){
    token=req.headers.authorization.split(`Bearer `)[1];
  }else{
    return res.status(403).json({error:"Unauthorized"});
  }
let decodedToken = await auth.verifyIdToken(token);
req.user = await User.findOne({email:decodedToken.email});
 return next();
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Token is missing/expired"})
  }
}
