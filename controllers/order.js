const {Order,CartItem}=require("../models/order")
const User=require("../models/user");
const Product=require("../models/product");
const {errorHandler}=require("../errorHandlers/dbErrorHandlers")

const orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};
const create = (req, res) => {

    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    console.log(order)
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }

        res.json(data);
    });
};
const addOrderToUserHistory=(req,res,next)=>{
    let history=[];
    req.body.order.products.forEach(item=>{
        history.push({
            _id:item._id,
            name:item.name,
            description:item.description,
            category:item.category,
            quantity:item.count,
            transaction_id:req.body.order.transaction_id,
            amount:req.body.order.amount
        })
    })
    User.findOneAndUpdate({_id:req.profile._id},{$push:{history:history}},{new:true},(error,data)=>{
        if(error){
            return res.status(400).json({
                error:"Could not update user purchase history !"
            })
        }
        next()
    })
}
const decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next();
    });
};
const listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};
const getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};
const updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};

module.exports={create,addOrderToUserHistory,decreaseQuantity,listOrders,getStatusValues,orderById,updateOrderStatus}