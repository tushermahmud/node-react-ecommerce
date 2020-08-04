import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {getProductsByArrivalBySell,getBraintreeClientToken,processPayment,createOrder} from "./ApiCore";
import {emptyCart} from "./CartHelpers";
import ProductCart from "../component/product/ProductCard";
import {isAuthenticated} from "../auth";
import 'braintree-web';
import DropIn from "braintree-web-drop-in-react";
import {Link} from "react-router-dom";

const Checkout=({products,run,setRun})=>{
    const [data,setData]=useState({
        success:false,
        clientToken:null,
        error:"",
        instance:{},
        address:""
    })
    const getTotal=()=>{
        return products.length>0?products.reduce((total,cartItems)=>(total+(cartItems.count*cartItems.price)),0):[]
    }
    const userId=isAuthenticated()&&isAuthenticated().user._id
    const token=isAuthenticated()&&isAuthenticated().token
    const getToken=(userId,token)=>{
        getBraintreeClientToken(userId,token)
            .then(data=>{
                if(data.error){
                    setData({
                        ...data,
                        error: data.error
                    })
                }else{
                    setData({
                        clientToken:data.clientToken
                    })
                }
            })
    }
    useEffect(()=>{
        getToken(userId,token)
    },[])
    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };
    const showDropIn=()=>(
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken!==null&&products.length>0?(
                <div>
                    <div className="form-group mb-3 delivery-form" style={{background:"#fff",boxShadow:"2px 8px 20px #88888888"}}>
                        <label className="font-weight-bold text-dark" style={{padding:"20px 0px 0px 10px"}}>Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <div>
                        <DropIn  options={{
                            authorization: data.clientToken,
                            /*paypal:{
                                flow:"vault"
                            }*/
                        }} onInstance={instance => (data.instance = instance)}/>
                    </div>
                </div>
            ):null}
        </div>
    )
    let deliveryAddress=data.address
    console.log(deliveryAddress)
    const buy=(event)=>{
        //send the nonce to server
        //nonce=data.instance.requestPaymentMethod
        let nonce;
        let getNonce=data.instance.requestPaymentMethod()
            .then(data=>{
                nonce=data.nonce
                //console.log(data)
                //once we have nonce send nonce as paymentmethod to backend
                //console.log("send nonce and total to process:",nonce,getTotal(products))
                const paymentData={
                    paymentMethodNonce:nonce,
                    amount:getTotal(products)
                }
                processPayment(userId,token,paymentData)
                    .then(response=>{
                        //empty cart
                        //create order
                        const createOrderData={
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        }
                        createOrder(userId,token,createOrderData)
                        setData({...data,success: response.success})
                        emptyCart()
                        setRun(!run)
                    })
                    .catch(error=>console.log(error))
            }).catch(error=>{
                console.log(error)
                setData({...data,error:error.message})
            })
    }
    const showSuccess=()=>(
        data.success?(<div className="alert alert-success">
            <div className="container-fluid">
                <div className="alert-icon">
                    <i className="material-icons">check</i>
                </div>
                <button type="button" className="close">
                    <span aria-hidden="true"><i className="material-icons">clear</i></span>
                </button>
                <b>Success Alert:</b>Your transaction is Successfully done !
            </div>
        </div>):""
    )
    return(
        <div className="row">
            <div className="col-md-12">
                <h4 className="text-uppercase font-weight-bold text-center mb-5">
                    Total:${getTotal()}
                </h4>
            </div>
            <div className="col-md-12">
                {showSuccess()}
            </div>
            <div className="col-md-4 offset-md-4">
                <div className="card card-blog">
                    <div className="card-header card-header-image">
                            {showDropIn()}
                    </div>
                    <div className="card-body text-center">
                        <button className="btn btn-rose text-center mb-5" onClick={buy} style={{width:"100%"}}>Pay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout