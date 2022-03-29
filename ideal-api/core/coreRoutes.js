const express = require('express');
var router  = new express.Router();
var User = db.User;
const {v4 : uuidv4} = require('uuid');
var dayjs = require("dayjs");
const passport = require('passport');
const refreshToken = async(req,res)=>{
    try{
    var decoded = await jwt.verify(req.cookies["refresh-token"],req.cookies["_csrf"]);
    if(decoded){
        var userExist = decoded;
        var accessToken = await jwt.sign({userName:userExist.userName,role:userExist.role},req.cookies["_csrf"],{expiresIn : 3600});
        var refreshToken = await jwt.sign({userName:userExist.userName,role:userExist.role}, req.cookies["_csrf"],{expiresIn:86400}) 
    res.cookie("refresh-token",refreshToken,{
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      });
    res.status(200).send({accessToken});
     return true;
    }
    res.status(403).send("please login first");
    return false;}catch(e){
        console.log(e.message);
    }
}
const loginService =async  (user,req)=>{
    let userExist = await User.findOne({where :{userName : user.userName}});

    if(userExist.password==user.password){
        var accessToken = await  jwt.sign({userName:userExist.userName,role:userExist.role},req.cookies["_csrf"],{  expiresIn: 3600 });
        var refreshToken = await jwt.sign({userName:userExist.userName,role:userExist.role}, req.cookies["_csrf"],{expiresIn :86400});  
       
        return {accessToken,refreshToken};
    }
    else{
        return false;
    }
}
const login =async (req,res)=>{

    var tokens  =await loginService(req.body,req);
    if(tokens){
        res.cookie("refresh-token",tokens.refreshToken,{
          secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
          expires: dayjs().add(30, "days").toDate(),
        });
        res.status(200).send(tokens.accessToken);
    }
    else{
        res.status(400).send("invalid login credentials");
    }
}

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
  }
  
const loginSocial = async (user) => {
    try{
    var userName = user.emails[0].value;
    
    var accessToken = await jwt.sign({userName:userName,role:"admin"},process.env.ACCESS_TOKEN_KEY,{expiresIn:3600});
    var refreshToken = await jwt.sign({userName:userName,role:"admin"},process.env.REFRESH_TOKEN_KEY,{expiresIn:86400})
    
    return {accessToken,refreshToken};}
    catch(e){
        console.log(e.message);
    }
}

router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn,async (req, res) => {

try{
  var tokens = await loginSocial(req.user);
  if (tokens) {
    res.cookie("refresh-token", tokens.refreshToken, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    console.log(tokens);
    res.status(200).send({
        accessToken: tokens.accessToken,
    });
} else {
    res.status(400).send("invalid login credentials");
}
}catch(e){
console.log(e);
}});

// Auth Routes
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
  // Successful authentication, redirect home.
  
  res.redirect('/good');
}
);
router.get("/login/facebook",passport.authenticate('facebook',{scope:['profile']}));
router.get("/facebook/callback",passport.authenticate('facebook',{failureRedirect:'/failed'}),
function(req,res){
  //successfull authentication,redirect home
  res.redirect('/good');
}
);
router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})



router.post("/login", login);
router.get("/refresh-token", refreshToken);

module.exports = router;