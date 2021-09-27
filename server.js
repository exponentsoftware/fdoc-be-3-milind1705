const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000
//import files
const todoRouter = require('./routes/todo');
const userRouter = require('./routes/usersRoute')
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//databse connection

// mongoose.connect("mongodb://localhost:27017/todo1")
// mongoose.connection.once('open', () => {
//     console.log(`connected with databse`)
// })
require('./database/mongo')
//routing 
app.use('/todo', todoRouter);
app.use('/user', userRouter)

//listning
app.listen(port, () => {
    console.log(`server is running on port${port}`)
})