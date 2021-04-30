const { json } = require("body-parser");
const Product = require("../models/product")
const formidable = require('formidable')
const fs = require('fs')
const _ = require("lodash");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, Product)=>{
        if(err){
            return res.status(400).json({
                 error: "Product was not found"
             })
         }
         req.product = Product;
         next();
    });
};

exports.getProduct = (req, res) =>{
    return res.json(req.product);
}

exports.createProduct = (req, res) =>{
   let form = formidable.IncomingForm();
   form.keepExtensions = true;

   form.parse(req, (err, fields, file)=>{
       if(err){
        return res.status(400).json({
            error: "Error Image"
        })
       }

       const {name, description, price, category, stock} = fields; //destructuring of data;

       if(!name || !description || !price || !category || !stock)
       {
           return res.status(400).json({
               message: "please include all fields"
           });
       }

       let product = new Product(fields);

       if(file.photo){
           if(file.photo.size > 3000000){
            return res.status(400).json({
                error: "Image is too big"
            });
           }
           product.photo.data = fs.readFileSync(file.photo.path);
           product.photo.contentType = file.photo.type;
        }
        console.log(product);

        product.save((err, product) =>{
            if(err){
               return res.status(400).json({
                    message:"Failed to save Products"
                })
            }
            res.json(product);
        });
        
   });
};
