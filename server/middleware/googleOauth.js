const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const User = require("../models/user.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5050/api/whiteboard/auth/google/callback",
      scope:["profile","email"]
    },
    async function (accessToken, refreshToken, profile, done) {
        // console.log(accessToken,profile);
        try {
          let user = await User.findOne({googleId:profile.id});
          if(!user){
            user = new User({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    dp:profile.photos[0].value
                  })
                  await user.save();
          }
          return done(null,user)
        } catch (error) {
          return done(error,null);
        }
    }
  )
);

passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})

module.exports = passport;
