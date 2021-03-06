const express = require('express');
const shortid = require('shortid');
const db = require('../models/db');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 할 일 추가
router.post('/', isLoggedIn, async (req, res, next) => {
    const { content } = req.body;
    const uid = req.user.id;
    try {
        const id = await shortid.generate();
        await db.get('tasks')
                .push({ "id": id, "uid": uid, "content": content })
                .write();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 할 일 수정
router.patch('/:id/:content', isLoggedIn, async (req, res, next) => {
    try {
        db.get('tasks')
                .find({ id: req.params.id })
                .assign({ "content": req.params.content })
                .write();
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 할 일 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
    const id = req.params.id;
    try {
        await db.get('tasks').remove({ id }).write();
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
