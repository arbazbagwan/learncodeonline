const {Order, ProductCart}  = require('../models/order')

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, Order)=>{
        if(err){
            res.status(400).json({
                error: "User Not Found"
            })
        }
        req.order = Order
        next();
    })   
}

exports.createOrder = (req, res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, Order)=>{
        if(err){
            res.status(400).json({
                error: "Failed to save"
            })
        res.json(Order);
        }
    })
}

exports.getAllOrders = (req, res) =>{
    Order.find()
    .populate("user", "_id name")
    .exec((err, orders)=>{
        if(err){
          return  res.status(400).json({
                error: "Failed to Get All Orders"
            })
        }
        res.json(orders); 
        })
}

exports.updateStatus = (req, res)=>{
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) =>{
            if(err){
               return res.status(400).json({
                    error: "Failed to update  Orders"
                })
            }
            res.json(order); 
            })  
}


exports.getOrderStatus = (req, res)=>{
    res.json(Order.schema.path("status").enumValues);
}
