const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
app.use(express.json());
app.use(cors());


const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const verifyRouter = require('./routes/verify');
const chatRouter = require('./routes/chat');
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/verify', verifyRouter);
app.use('/chat', chatRouter);
app.use("/uploads",express.static(path.join(__dirname, "./uploads/")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});