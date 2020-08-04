const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox, // Production
    merchantId: process.env.BRAINTREE_MERCHANT_ID||"b45nx6bwszrscqzb",
    publicKey: process.env.BRAINTREE_PUBLIC_KEY||"84tphprpmt9qfn66",
    privateKey: process.env.BRAINTREE_PRIVATE_KEY||"5789b580289e5ddc23c1429a2d0f08ba",
});

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};
exports.paymentProcess=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount
    //charge
    let newTransaction=gateway.transaction.sale({
        amount:amountFromTheClient,
        paymentMethodNonce:nonceFromTheClient,
        options:{
            submitForSettlement:true
        }
    },(error,result)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.json(result)
        }
    })
}