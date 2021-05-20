const Users = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req,res)=>{
  
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()[0].msg});
      }

    const users = new Users(req.body);


  users.save((err, user)=>{
      if(err){
          return res.status(400).json({
              error: "NOT ABLE TO SAVE USER INTO DB"
          })
      }
      else{
          res.json(user);
      }
  });
};

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        'message':'working'
    });
};

exports.signin = (req,res) =>{
    //destructuring of data
    const {email, password} = req.body;

    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()[0].msg});
      }

    Users.findOne({email}, (err, user) =>{
        if(err || !user){
           return res.status(400).json({
                error: "user email does not exists"
            })
        }
        if(!user.authenticate(password)){
           return res.status(401).json({
                error:"email and password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id:user._id}, process.env.SECRET)
        //create cookie and put token in it
        res.cookie("token", token, {expire: new Date()+ 9999})
        const {_id, email, name, role} = user;
        return res.json({
            token, _id,email,name,role
        })
    })

};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

exports.isAuthenticated = (req, res, next) =>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"Access denied cannot login"
        })
    }
    next();
};

exports.isAdmin = (req, res, next) =>{
    if(req.profile.role == 0){
        res.status(403).json({
            error: "Not an admin"
        })
    }
    next();
};