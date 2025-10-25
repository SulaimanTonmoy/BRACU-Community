const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userModel = require("../models/user"); // user schema and model imported

// router.get("/", (req, res) => {
//   userModel
//     .find({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// signup route
router.post("/register", (req, res) => {
  // none of the fields can be empty
  const { fName, lName, email, dob, phone, gender, password } = req.body;

  // trying to create an user. if failed, it will throw an error
  userModel
    .signup(fName, lName, email, dob, phone, gender, password)
    .then((newUser) => {
      // creating the token
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });

      res.json({ email: email, token: token });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

// login route
router.post("/login", (req, res) => {
  // none of the fields can be empty
  const { email, password } = req.body;

  // trying to login. if failed, it will throw an error
  userModel
    .login(email, password)
    .then((user) => {
      // creating the token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });

      res.json({ email: email, token: token });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

module.exports = router;
