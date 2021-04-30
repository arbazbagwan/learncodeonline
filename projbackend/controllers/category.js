const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category)=>{
        if(err){
            return res.status(400).json({
                 error: "Category was not found"
             })
         }
         req.category = category;
         next();
    })
   
};

exports.createCategory = (req, res) =>{
    const category = new Category(req.body);
    category.save((err, category) =>{
        if(err){
            return res.status(400).json({
                 error: "Category was not saved"
             })
         }
         res.json(category);
    });
};

exports.getCategory = (req, res) =>{
    return res.json(req.category);
}

exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, categories)=>{
        if(err){
            return res.status(400).json({
                 error: "No Category was found"
             })
         }
         res.json(categories);   
    })
}

exports.updateCategory = (req, res) =>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory)=>{
        if(err){
            return res.status(400).json({
                 error: "Not able to update category"
             })
         }
         res.json(updatedCategory); 
    })
}

exports.deleteCategory = (req, res) =>{
    const category = req.category;

    category.remove((err, result) =>{
        if(err){
            return res.status(400).json({
                 error: "Not able to update category"
             })
         }
         res.json({
             message: result.name+" was deleted"
         });
    })
}