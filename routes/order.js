const express=require("express");
const router=express.Router();
const {requiredSignin,isAdmin,isAuth}=require('../controllers/auth');
const {userById}=require('../controllers/user')
const {create,addOrderToUserHistory,decreaseQuantity,listOrders,getStatusValues,updateOrderStatus,orderById}=require('../controllers/order')


router.post(
    "/order/create/:userId",
    requiredSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
);
router.get("/orders/list/:userId",requiredSignin,isAuth,isAdmin,listOrders)
router.get("/orders/status-values/:userId",requiredSignin,isAuth,isAdmin,getStatusValues)
router.put(
    "/order/:orderId/status/:userId",
    requiredSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports=router