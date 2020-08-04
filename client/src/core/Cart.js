import React, {useEffect, useState,Fragment} from "react";
import Layout from "./Layout";
import {getCartItems,emptyCart} from "./CartHelpers";
import CartItems from "./CartItems";
import {isAuthenticated} from "../auth";
import Checkout from "./Checkout";
import {Link} from "react-router-dom";
const Cart=()=>{
    const [items,setItems]=useState([])
    const [run,setRun]=useState(false)
    useEffect(()=>{
        setItems(getCartItems())
    },[run])

    const handleClick=(event)=>{
        emptyCart()
        setRun(!run)
    }

    const showItems=()=>{
        return(
            <div className="row">
                <h2 className="text-uppercase font-weight-bold font-italic">{`Total Cart Items ${items.length}`}</h2>
                <hr/>
                <div className="card card-plain">
                    <div className="card-body">
                        <h3 className="card-title">Shopping Cart</h3>
                        <br/>
                        <button className="btn btn-default float-right" onClick={handleClick}>Clear All Items</button>
                        <div className="table-responsive">
                            <table className="table table-shopping">
                                <thead>
                                <tr>
                                    <th className="text-center"></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th className="text-center">Qty</th>
                                    <th>Amount</th>
                                    <th>Remove Item</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map(item=>(
                                        <CartItems product={item} key={item._id} run={run} setRun={setRun}/>
                                    )
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const showNoProduct=()=>{
        if(items.length<1){
            return (
                <div className="row">
                    <div className="alert alert-danger font-weight-bold" style={{width:"100%"}}>No Product found in the cart !</div>
                </div>
            )
        }
    }
    return(
        <Layout title="Cart Page" description="See your Products in the cart" classname="container">
            {items.length<1?showNoProduct():showItems()}
            {isAuthenticated()&&items.length>0?(
                <Checkout products={items} run={run} setRun={setRun}/>
            ):(<h3 className="font-weight-bold font-italic">Please <Link to="/signin">Sign in</Link> to Checkout</h3>)}
        </Layout>
    )

}
export default Cart;