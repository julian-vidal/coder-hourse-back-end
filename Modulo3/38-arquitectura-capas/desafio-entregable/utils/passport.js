const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const User = require("../dao/user.schema")
const {comparePassword, hashPassword } = require("./utils")
const {Types} = require("mongoose")


// Check if the username and password provided match with a user in MongoDB 
passport.use("login", new LocalStrategy({usernameField: "email",
passwordField: "password"}, async (email, password, done) => {

    try {
        const user = await User.findOne({email})
        console.log(`user: ${user}`)

        if(!user || !comparePassword(password, user.password)){
            return done(null, false, {message: "User doesn't exist or password doesn't match"})
        }

        return done(null, user)

    } catch (error) {
        return done(error)
    }
    
}))

// Check if the username exists in MongoDB, If so, returns an error, otherwise, creates a new user
passport.use("signup", new LocalStrategy(
    {passReqToCallback: true,
        usernameField: "email",
        passwordField: "password"
    },
    async(req, email, password, done) => {
        console.log({email})
        const user = await User.findOne({email})
        if(user) {
            return done(null, false, {message: "User already exists :p"})
        }

        const hashedPassword = hashPassword(password)
        console.log(hashedPassword);
        const newUser = new User ({
            email,
            password: hashedPassword
        })
        await newUser.save()
        return done(null, newUser)
    }
))

passport.serializeUser((user,done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id,done) => {
    id = Types.ObjectId(id)
    const user = await User.findById(id)
    done (null, user)
})