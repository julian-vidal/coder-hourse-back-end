const passport = require("passport")
const dotenv = require("dotenv")
const GoogleStrategy = require("passport-google-oauth20").Strategy;


dotenv.config()

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

// Login Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: process.env.redirect_uris,
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    done(null, profile); //req.user
}));