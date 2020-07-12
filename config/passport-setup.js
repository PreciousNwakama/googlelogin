const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user.id)
    })

});

passport.use(
    new GoogleStrategy({
        //options for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }), () => { accessToken, refreshToken, profile, done },
    //passport callback function
    //Check if user already exixt in our db
    User.findOne({ googleid: profileid }).then((currentUser) => {
        if (currentUser) {
            //already have the User
            console.log('User is:'.currentUser);
            done(null, currentUser);
        } else {
            //if not, create User in out db
            new User({
                username: profile.displayName,
                googleid: profile.id
            }), save().then((newUser) => {
                console.log('new User connected' + newUser);
                done(null, newUser);
            })
        }
    })



);
