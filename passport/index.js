const local = require('./localStrategy');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({users: []}).write();

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