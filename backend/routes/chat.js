const express = require("express");
const db = require("../connection.js");
const router = express.Router();

router.post("/create", (req, res) => {
  const data = req.body;
  db.query(
    `INSERT INTO chat (seen_status, content, send_user_id, receive_user_id	) VALUES (0, "${data.content}", ${data.sender_id}, ${data.receiver_id})`,
    (err, result) => {
      if (err) {
        res.send({ msg: "error" });
      } else {
        res.send({ msg: "success" });
      }
    }
  );
});

router.get("/get-chat-heads/:user_id", (req, res) => {
  db.query(
    `SELECT receive_user_id AS user_id, time_stamp, seen_status
    FROM
    (
      SELECT receive_user_id, time_stamp, seen_status FROM chat WHERE send_user_id = ${req.params.user_id}
      UNION
      SELECT send_user_id, time_stamp, seen_status FROM chat WHERE receive_user_id = ${req.params.user_id}
      ORDER BY time_stamp DESC
    ) AS chats
    GROUP BY chats.receive_user_id
    HAVING MAX(time_stamp)
    ORDER BY time_stamp DESC
    ;`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

router.get("/get-chats/:user_id/:receiver_id", (req, res) => {
  db.query(
    `SELECT * FROM chat WHERE (send_user_id = ${req.params.user_id} AND receive_user_id = ${req.params.receiver_id}) OR (send_user_id = ${req.params.receiver_id} AND receive_user_id = ${req.params.user_id}) ORDER BY time_stamp ASC`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

router.put("/update-seen-status", (req, res) => {
  db.query(
    `UPDATE chat SET seen_status = 1, time_stamp=time_stamp WHERE receive_user_id = ${req.body.this_id} AND send_user_id = ${req.body.another_id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

router.get('/get-last-message/:current_id/:another_id', (req, res) => {
  db.query(
    `SELECT * FROM chat WHERE (send_user_id = ${req.params.current_id} AND receive_user_id = ${req.params.another_id}) OR (send_user_id = ${req.params.another_id} AND receive_user_id = ${req.params.current_id}) ORDER BY time_stamp DESC LIMIT 1`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result[0]);
    }
  );
});

module.exports = router;
