const Users = require("../models/user");

exports.signup = (req,res)=>{
  const users = new Users(req.body);
  users.save((err, user)=>{
      if(err){
          return res.status(400).json({
              err: "NOT ABLE TO SAVE USER INTO DB"
          })
      }
      else{
          res.json(user);
        //   res.json({
        //       name: user.name,
        //       email: user.email,
        //       _id: user._id
        //   })
      }
  });
};

exports.signout = (req,res) => {
    res.json({
        'message':'working'
    });
};