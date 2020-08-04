const express=require("express");
const router=express.Router();
const {create,productById,read,deleteProduct,updateProduct,list,listRelated,listCategories,listBySearch,photo,listSearch}=require('../controllers/product');
const {userById}=require('../controllers/user');
const {requiredSignin,isAuth,isAdmin}=require("../controllers/auth")


router.get("/product/:productId", read);
router.post("/product/create/:userId", requiredSignin, isAuth, isAdmin, create);
router.delete(
    "/product/:productId/:userId",
    requiredSignin,
    isAuth,
    isAdmin,
    deleteProduct
);
router.put(
    "/product/update/:productId/:userId",
    requiredSignin,
    isAuth,
    isAdmin,
    updateProduct
);
router.get("/products",list)
router.get("/products/search",listSearch)
router.get("/products/related/:productId",listRelated)
router.get("/products/categories",listCategories)
router.param('userId',userById)
router.param('productId',productById)
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId",photo)


module.exports=router;