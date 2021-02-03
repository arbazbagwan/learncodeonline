const express = require("express");
//const cors = require("cors");
const app = express();
//app.use(cors());

const port = 3000;

app.get("/", (req, res)=>{
    return res.send("hello there");
});
app.get("/login", (req, res)=>{
    return res.send("login page");
});
app.get("/signup", (req, res)=>{
    return res.send("signup page");
});
app.listen(port, () => {
    console.log("Example app to listen");
});         