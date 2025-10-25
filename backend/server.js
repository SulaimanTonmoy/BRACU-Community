// to securely use the environment variables in the .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })

// all the API routes
const userRouter = require("./routes/user");
app.use("/user", userRouter);


// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
