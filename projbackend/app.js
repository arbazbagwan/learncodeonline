const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//myRoutes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authentication');

//Middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


//DB Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("db connected");
});

//MyRoutes

app.use("/api", authRoutes);
app.use("/api",userRoutes);
//Server 
const port = 8000;
app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
})