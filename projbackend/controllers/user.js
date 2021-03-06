const User = require("../models/user");

exports.getUserById =(req, res, next, id) =>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User was not found in DB..."
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) =>{
    req.profile.salt = "";
    req.profile.encry_password = "";
    req.profile.createdAt = "";
    req.profile.updatedAt="";
    return res.json(req.profile);
}