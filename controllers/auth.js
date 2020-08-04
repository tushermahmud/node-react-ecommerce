const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for auth check
const { errorHandler } = require('../errorHandlers/dbErrorHandlers');
const signup = (req, res) => {
    // console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err:"Email address already exist !",
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user,
        });
    });
};

const signin=(req,res)=>{
    //find the user based on email
    const {email,password}=req.body;
    User.findOne({email},(error, user)=>{
        if(error||!user){
            return res.status(400).json({
                error:"user with that email does not exist!"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email and password does not match!"
            })
        }
        //if user is found then check the email and password
        //create authenticate method in user model
        //generate a signed token with user id and secret
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET||"cdfghjudfshdhsgfdyhusgfyhudsfu")
        //persist the token as t in cookie with expiry date
        res.cookie("cookieToken",token,{expire:new Date()+9999})
        //return response with user user and token to frontend client
        const {_id,email,name,role}=user;
        return res.json({
            token,
            user:{_id,email,name,role}
        })
    })
}

const signout=(req,res,next)=>{
    res.clearCookie("cookieToken");
    res.json({
        message:"you have successfully signed out!"
    })
};
const requiredSignin=expressJwt({
    secret:process.env.JWT_SECRET||"cdfghjudfshdhsgfdyhusgfyhudsfu",
    userProperty:"auth",
});
const isAuth=(req,res,next)=>{
    let user=req.profile && req.auth && req.profile._id==req.auth._id;
    if(!user){
        return res.status(403).json({
            error:"access denied !"
        })
    }
    next();
}
const isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Admin resource! access denied "
        })
    }
    next();
}
module.exports={
    signup,signin,signout,requiredSignin,isAdmin,isAuth
}
