const local = require('./localStrategy');
const db = require('../models/db');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = db.get('users').find({id: id}).value();
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    local(passport);
}