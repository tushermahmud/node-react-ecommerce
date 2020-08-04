const express=require("express");
const app=express();
const router=express.Router();
const {userById,read,update,purchaseHistory}=require('../controllers/user');
const {requiredSignin,isAdmin,isAuth}=require('../controllers/auth');

router.get("/secret/:userId",requiredSignin,isAuth, isAdmin, (req,res)=>{
    res.json({
        user:req.profile
    })
})

router.get("/user/:userId",requiredSignin,isAuth,read)
router.put("/user/update/:userId",requiredSignin,isAuth,update)
router.get('/orders/by/user/:userId', requiredSignin, isAuth, purchaseHistory);


/*router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(r.route.path)
    }
})*/

router.param('userId',userById)

module.exports=router;