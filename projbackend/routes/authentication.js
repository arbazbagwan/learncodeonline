var express = require('express');
var router = express.Router();
const {signout,signup,signin} = require('../controllers/authentication');
const { check, validationResult } = require('express-validator');


router.get("/signout",signout);

router.post("/signup",[
    check("name","name should be greater than 3 char").isLength({min: 3}),
    check("email","email required").isEmail(),
    check("password","password should be greater than 3").isLength({min: 3})
], signup);

router.post("/signin",signin);

module.exports = router;