const express = require("express");
const db = require("../connection.js");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
}).single("myfile")

const obj = (req, res, next) => {
  try {
    upload(req, res, () => {
      next();
    });

  } catch (error) {
    console.log("obj",error)
  }
}

router.post("/new", (req, res) => {
  const data = req.body;
  db.query(
    `SELECT * FROM users WHERE email = "${data.email}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send({ msg: "Email already exists!" });
        } else {
          db.query(
            `INSERT INTO users (firstname, lastname, dob, password, gender, email, phone, time_stamp) VALUES ("${data.firstName}", "${data.lastName}", "${data.dob}", "${data.password}", "${data.gender}", "${data.email}", "${data.phone}", CURRENT_TIMESTAMP())`,
            (er) => {
              if (er) console.log(er);
              else res.send({ msg: "success" });
            }
          );
        }
      }
    }
  );
});

router.get("/checkconnection/:user_id/:received_id", (req, res) => {
  db.query(
    `SELECT * FROM friend WHERE user_id = ${req.params.user_id} AND received_id = ${req.params.received_id}`,
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length > 0) res.send({ msg: "connected" });
        else res.send({ msg: "disconnected" });
      }
    }
  );
});

router.post("/sendrequest", (req, res) => {
  db.query(
    `SELECT * FROM friend WHERE user_id = ${req.body.user_id} AND received_id = ${req.body.received_id}`,
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result.length > 0) {
          db.query(
            `DELETE FROM friend WHERE user_id = ${req.body.user_id} AND received_id = ${req.body.received_id}`,
            (err, result) => {
              if (err) console.log(err);
              else res.send({ msg: "disconnected" });
            }
          );
        } else {
          db.query(
            `INSERT INTO friend (user_id, received_id) VALUES (${req.body.user_id}, ${req.body.received_id})`,
            (err, result) => {
              if (err) console.log(err);
              else res.send({ msg: "connected" });
            }
          );
        }
      }
    }
  );
});
router.get("/getuser/:email/:password", (req, res) => {
  db.query(
    `SELECT * FROM users WHERE email = "${req.params.email}" AND password = "${req.params.password}"`,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

router.get("/getmatchedusers/:usercount/:user_id/:txt", (req, res) => {
  db.query(
    `SELECT user_id, gender, firstname, lastname, email FROM users WHERE user_id != ${req.params.user_id} AND (firstname LIKE "%${req.params.txt}%" OR lastname LIKE "%${req.params.txt}%") ORDER BY RAND() LIMIT ${req.params.usercount};`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

router.get("/getrandomusers/:usercount/:user_id", (req, res) => {
  db.query(
    `SELECT user_id, gender, firstname, lastname, email FROM users WHERE user_id != ${req.params.user_id} ORDER BY RAND() LIMIT ${req.params.usercount};`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
});

router.get("/getmutualcount/:user1/:user2", (req, res) => {
  db.query(
    `SELECT COUNT(*) AS mutual FROM
((SELECT user_id, received_id FROM friend WHERE user_id=${req.params.user1})
UNION
(SELECT received_id, user_id FROM friend WHERE received_id=${req.params.user1})) t1
inner join ((SELECT user_id, received_id FROM friend WHERE user_id=${req.params.user2})
UNION
(SELECT received_id, user_id FROM friend WHERE received_id=${req.params.user2})) t2
on t1.received_id = t2.received_id;`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result[0]);
    }
  );
});

router.get("/getfriendcount/:user_id", (req, res) => {
  db.query(
    `SELECT COUNT(*) AS friendcount FROM friend WHERE user_id = ${req.params.user_id} OR received_id = ${req.params.user_id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result[0]);
    }
  );
});

router.get("/getdetails/:user_id", (req, res) => {
  db.query(
    `SELECT * FROM users WHERE user_id = ${req.params.user_id}`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result[0]);
    }
  );
});

router.post("/updatename", (req, res) => {
  const { name, user_id } = req.body;
  const [firstname, lastname] = name.split(" ");
  db.query(
    `UPDATE users SET firstname = "${firstname}", lastname = "${lastname}" WHERE user_id = ${user_id}`,
    (err, result) => {
      if (err) console.log("endpoint", err);
      res.send({ msg: "success" });
    }
  );
});

router.post("/uploadphoto/:user_id", upload, async (req, res) => {
  const { user_id } = req.params;
  db.query(`UPDATE users SET profile_picture = "${req.file.filename}" WHERE user_id = ${user_id}`
    , (err, result) => {
      if (err) console.log(err);
      res.send({ "file" : req.file.filename });
    });
});
module.exports = router;
