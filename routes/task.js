const express = require('express');
const shortid = require('shortid');
const db = require('../models/db');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 할일 추가
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

// 할일 수정
router.patch('/:id/:content', async (req, res, next) => {
    try {
        //const content = req.body.content;
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

// 할일 삭제
router.delete('/:id', async (req, res, next) => {
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
