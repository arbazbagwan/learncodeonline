var express = require('express');
var router = express.Router();
const {signout,signup} = require('../controllers/authentication');

router.get("/signout",signout);
router.post("/signup", signup);
module.exports = router;