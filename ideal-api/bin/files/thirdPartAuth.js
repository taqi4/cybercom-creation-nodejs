const express = require('express');
var router = new express.Router();
var User = db[modelToUse];
const {
    v4: uuidv4
} = require('uuid');
var dayjs = require("dayjs");

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
  }
  
  
  // Example protected and unprotected routes
  router.get('/failed', (req, res) => res.send('You Failed to log in!'))
  
  // In this route you can see that if the user is logged in u can acess his info in: req.user
  router.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))
  
  // Auth Routes
  router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user.emails[0].value);
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
  module.exports = router;