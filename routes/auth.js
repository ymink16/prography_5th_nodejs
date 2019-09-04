const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({users: []}).write();

const router = express.Router();

router.post('/register', isNotLoggedIn, async (req, res, next) => {
    const { email, password, password2, nickname } = req.body;
    if (password !== password2) {
        req.flash('joinError', '비밀번호를 확인해주세요.');
        return res.redirect('/register');
    }
    try {
        const exUser = db.get('users').find({ email }).value();
        if (exUser) {
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/register');
        }
        const hash = await bcrypt.hash(password, 12);
        const id = shortid.generate();
        await db.get('users')
                .push({"id": id, "email": email, "password": hash, "nickname": nickname})
                .write();
        return res.redirect('/login');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/login');
        }
        
        return req.logIn(user, loginError => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;