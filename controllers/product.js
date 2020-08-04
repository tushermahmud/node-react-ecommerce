const Product = require("../models/product");
const dbErrorHandler = require ("../errorHandlers/dbErrorHandlers");
const fs = require('fs');
const formidable=require("formidable");
const _ =require("loadsh");
const {errorHandler}=require("../errorHandlers/dbErrorHandlers")

const updateProduct= (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};
const deleteProduct=(req,res)=>{
    let product=req.product
    product.remove((error,deleted)=>{
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        return res.json({
            deleted,
            success:"the product is successfully deleted !"
        })
    })
}
const read=(req,res)=>{
    req.product.photo = undefined;
    return res.json(
        req.product
    )
}
const productById=(req,res,next,id)=>{
    Product.findById(id).populate('category').exec((error,product)=>{
        if(error||!product){
            return res.status(400).json({
                error:"product not found"
            })
        }
        req.product=product
        next()
    })
}
const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};


/*
sell/arrival
by sell=/products?sortby=sold&&order=desc&&limit=4
by arrival=/products?sortby=craetedAt&&order=desc&&limit=4
if no params are sent the all products are returned
*/
const list=(req,res)=>{
    let order=req.query.order?req.query.order:"asc";
    let soryBy=req.query.sortBy?req.query.sortBy:"_id"
    let limit=req.query.limit?parseInt(req.query.limit):6
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[soryBy,order]])
        .limit(limit)
        .exec((error,products)=>{
            if(error){
                return res.status(400).json({
                    error:"product not found"
                })
            }
            res.json(products)
        })
}
/*
it will find the products based on the request product category
based on that the products that have the same category will be returned
*/
const listRelated=(req,res)=>{
    let limit=req.query.limit?parseInt(req.query.limit):6
    Product.find({_id:{$ne:req.product},category:req.product.category})
        .limit(limit)
        .populate('category','_id name')
        .exec((error,products)=>{
            if(error){
                return res.status(400).json({
                    error:"products not found"
                })
            }
            res.json(products)
        })

}
const listCategories=(req,res)=>{
    Product.distinct("category",{},(error,categories)=>{
        if(error){
            return res.status(400).json({
                error:"category not found"
            })
        }
        res.json(categories);
    })
}
const listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};
const photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}
//creating request for having the list of search and category value
const listSearch=(req,res)=>{
    const query={};
    if(req.query.search){
        query.name={$regex:req.query.search,$options:'i'}
        //assign category value on query.category
        if(req.query.category&&req.query.category!='All'){
            query.category=req.query.category
        }
        Product.find(query,(error,products)=>{
            if(error){
                return res.status(400).json({
                    error:errorHandler(error)
                })
            }
            res.json(products)
        }).select(-photo)
    }
}

module.exports={
    create,productById,read,deleteProduct,updateProduct,list,listRelated,listCategories,listBySearch,photo,listSearch
}