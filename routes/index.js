const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { 
    title: '메인 페이지',
    user: req.user, 
  });
});

router.get('/login', isNotLoggedIn, (req, res, next) => {
  res.render('login', { 
    title: '로그인 페이지',
    user: req.user,
    loginError: req.flash('loginError')
   });
});

router.get('/register', isNotLoggedIn, (req, res, next) => {
  res.render('register', { 
    title: '회원가입 페이지',
    user: req.user,
    joinError: req.flash('joinError')
  });
});

module.exports = router;
