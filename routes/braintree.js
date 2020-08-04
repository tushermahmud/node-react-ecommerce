const express=require("express");
const router=express.Router();
const {requiredSignin,isAdmin,isAuth}=require('../controllers/auth');
const {userById}=require('../controllers/user')
const { generateToken,paymentProcess } = require("../controllers/brainTree");

router.get("/braintree/getToken/:userId", requiredSignin, isAuth, generateToken);
router.post("/braintree/payment/:userId",requiredSignin,isAuth,paymentProcess)
router.param("userId", userById);
module.exports=router
