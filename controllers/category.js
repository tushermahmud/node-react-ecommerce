const Category =require("../models/category");
const {errorHandler} = require ("../errorHandlers/dbErrorHandlers")

const read=(req,res)=>{
    return res.json(
        req.category
    )
};
const categoryById=(req,res,next,id)=>{
    Category.findById(id).exec((error,category)=>{
        if(error||!category){
            return res.status(400).json({
                error:"Category not found"
            })
        }
        req.category=category
        next()
    })
}
const remove=(req,res)=>{
    const category=req.category;
    category.remove((error,data)=>{
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json({
            message:"category is successfully deleted !"
        })
    })

}
const list=(req,res)=>{
    Category.find((error,data)=>{
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(data)
    })
}
const update=(req,res)=>{
    const category=req.category;
    category.name=req.body.name
    category.save((error,data)=>{
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json({
            data
        })
    })
}
const create=(req,res)=>{
    const category=new Category(req.body);
    category.save((error,data)=>{
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json({
            data
        })
    })
}


module.exports={
    create,update,categoryById,read,remove,list
}