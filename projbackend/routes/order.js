const express = require('express');
var router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/authentication');
const {getUserById, pushOrderInPurchaseList} = require('../controllers/user');
const {updateStock } = require('../controllers/product');
const {getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus} = require('../controllers/order')

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.get("/order/create/userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//status routes

router.get("/order/status/:userId",isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus )
module.exports = router;
