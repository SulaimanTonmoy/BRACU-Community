const express = require('express');
const db = require('../connection.js');
const router = express.Router();

router.post('/create', (req, res) => {
    const data = req.body;
    db.query(`INSERT INTO comment (content, commenter_id, post_id) VALUES ("${data.content}", ${data.user_id}, ${data.post_id})`, (err, result) => {
        if (err) {
            res.send({ msg: "error" });
        } else {
            res.send({ msg: "success" });
        }
    })
})

router.post('/like', (req, res) => {
    const data = req.body;
    db.query(`INSERT INTO reacts_comment (comment_id, user_id) VALUES (${data.comment_id}, ${data.user_id})`, err => {
        if (err) {
            res.send({ msg: "error" });
        } else {
            res.send({ msg: "success" });
        }
    })
})

router.post('/unlike', (req, res) => {
    const data = req.body;
    db.query(`DELETE FROM reacts_comment WHERE comment_id = ${data.comment_id} AND user_id = ${data.user_id}`, err => {
        if (err) {
            res.send({ msg: "error" });
        } else {
            res.send({ msg: "success" });
        }
    })
})

router.get('/getall/:post_id', (req, res) => {
    db.query(`SELECT firstname, lastname, gender, profile_picture, content, c.time_stamp, comment_id 
FROM comment c
INNER JOIN users u
ON c.commenter_id = u.user_id
WHERE c.post_id=${req.params.post_id};`, (err, result) => {
        if (err) console.log(err)
        res.send(result);
    });
})

router.get('/isliked/:comment_id/:user_id', (req, res) => {
    db.query(`SELECT * FROM reacts_comment WHERE user_id=${req.params.user_id} AND comment_id=${req.params.comment_id}`, (err, result) => {
        if (err) {
            res.send({ msg: "error" });
            console.log(err)
        } else {
            res.send(result);
        }
    })
})

router.get('/likecount/:comment_id', (req, res) => {
    db.query(`SELECT COUNT(*) AS likecount FROM reacts_comment WHERE comment_id = ${req.params.comment_id}`, (err, result) => {
        if (err) console.log(err)
        res.send(result);
    });
})


module.exports = router;