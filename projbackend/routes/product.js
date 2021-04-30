const express = require('express');
const router = express.Router();

const {getProduct, getProductById, createProduct} = require('../controllers/product');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/authentication');
const {getUserById} = require('../controllers/user');


router.param("userId", getUserById);
router.param("getProductById", getProductById);

router.get("/product/getProduct/:userId/:getProductById", isSignedIn, isAuthenticated, isAdmin, getProduct);
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
module.exports = router;