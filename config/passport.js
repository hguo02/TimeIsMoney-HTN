const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
let User = require("../models/user").user;

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user_data = await User.find({ 'username': username });
        const user = user_data[0];
        if (user == null) {
            return done(null, false, { message: 'Username not found' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) => {
        const user_data = await User.find({ '_id': id })
        return done(null, user_data[0])
    })
}

module.exports = initialize