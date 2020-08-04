const express=require("express");
const router=express.Router();
const {create,update,categoryById,read,remove,list}=require('../controllers/category');
const {userById}=require('../controllers/user');
const {requiredSignin,isAuth,isAdmin}=require("../controllers/auth")
const { check, validationResult } = require('express-validator');


router.post("/category/create/:userId",requiredSignin,isAuth,isAdmin,create)
router.put("/category/update/:categoryId/:userId",requiredSignin,isAuth,isAdmin,update)
router.delete(
    "/category/delete/:categoryId/:userId",
    requiredSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/categories", list);
router.get("/category/:categoryId", read);

router.param('userId',userById)
router.param('categoryId',categoryById)


module.exports=router;