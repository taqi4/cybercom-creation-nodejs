const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "435722670820-f1ic8so7nsuoubp7mttldi528fnlvlei.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
    console.log(profile);
    return done(null, profile);
  }
));
passport.use(new FacebookStrategy({
    clientID: "709567587066497",
    clientSecret:"01201f88f41d1b1baaea308d70560060",
    callbackURL: "http://localhost:3000/facebook/callback"
}, function (accessToken, refreshToken, profile, done) {
  /*
   use the profile info (mainly profile id) to check if the user is registerd in ur db
   If yes select the user and pass him to the done callback
   If not create the user and then select him and pass to callback
  */
  console.log(profile);
  return done(null, profile);
}
));
