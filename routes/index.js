const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'login' });
});

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'register' });
});

module.exports = router;
