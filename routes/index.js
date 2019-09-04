const express = require('express');
const db = require('../models/db');
const { isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let tasks;
    if (req.isAuthenticated()) {
      tasks = await db.get('tasks')
                            .filter({ uid: req.user.id })
                            .value();
    } else {
      tasks = [
        {"id": "1", "uid": "example", "content": "회원가입 하기"},
        {"id": "2", "uid": "example", "content": "로그인 하기"},
        {"id": "3", "uid": "example", "content": "할 일 관리하기"},
      ]
    }
    res.render('index', { 
      title: '메인 페이지',
      user: req.user,
      tasks: tasks, 
    });
  } catch (error) {
    console.error(error);
    next(error);
  }

  
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
