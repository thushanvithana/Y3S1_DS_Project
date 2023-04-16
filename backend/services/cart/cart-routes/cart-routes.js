const express = require("express");
const router = express.Router();
const cart = require("../model/cart");
const cartController= require("../cart-controllers/cart-controllers");
 
const {verifyToken, allowIfLoggedin, grantAccess} = require("../../user-auth/controllers/user-controllers")

router.post("/addCart", cartController.addCart);
module.exports = router;