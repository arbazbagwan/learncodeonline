const Order = require("../models/order");
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

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  };

  exports.deleteUser = (req, res) =>{
    User.findByIdAndDelete(req.profile._id, (err, user)=>{
      if(err){
       return res.status(400).json({
          error: "You are not authorized to delete this user"
        });
      }
      res.json({
        message:"User deleted"
      });
    });
  };

  exports.userPurchaseList = (req, res) =>{
        Order.find({user: req.profile._id})
        .populate("user", "_id name")
        .exec((err, order) => {
          if(err){
            return res.status(400).json({
              error: "Unable to update purchase list"
            });
          }
          return res.json(order)
        })
  }

  exports.pushOrderInPurchaseList = (req, res, next) =>{
    let purchases = [];
    req.body.order.products.forEach(product => {
      purchases.push({
        _id: product._id,
        name: product.name,
        discription: product.discription,
        category: product.category,
        quantity:product.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id
      }) 
    })

// store this in DB

    User.findOneAndUpdate(
      {_id: req.profile._id},
      {$push: {purchases: purchases}},
      {new: true},
      (err, purchases) =>{
        if(err){
          return res.status(400).json({
            err:"unable to save purchase list"
          });
        }
        next();
      }
      )
    
  }
  