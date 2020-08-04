const User = require('../models/user');
const { Order } = require('../models/order');
const { errorHandler } = require('../errorHandlers/dbErrorHandlers');

const userById=(req,res,next,id)=>{
    User.findById(id).exec((error,user)=>{
        if(error||!user){
            return res.status(400).json({
                error:"no user by this id !"
            })
        }
        req.profile=user;
        next();
    });
}
const read=(req,res)=>{
    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    return res.json(req.profile)
}
const update=(req,res)=>{
    User.findOneAndUpdate({_id:req.profile._id},
        {$set:req.body},
        {new:true},
        (error,user)=>{
        if(error){
            res.status(400).json({
                error:"you are not authorized to perform this action"
            })
        }
        req.profile.hashed_password=undefined
        req.profile.salt=undefined
        res.json(user);
    })
}
const purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

module.exports={userById,read,update,purchaseHistory}