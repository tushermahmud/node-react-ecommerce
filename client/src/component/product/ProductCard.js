import React, {useState} from "react";
import {Link} from "react-router-dom";
import ShowImage from "../../core/ShowImage";
import {addItem} from "../../core/CartHelpers";
import {Redirect} from "react-router-dom"
const ProductCart=({product})=>{
    const [redirect,setRedirect]=useState(false)
    const addToCart=()=>{
        addItem(product,()=>{
            setRedirect(true)
        })
    }
    const willRerirect=redirect=>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    }
    return(
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card">
                <div className="card-header card-header-rose card-header-icon">
                    <h5 className="text-capitalize font-weight-bold">{product.name}</h5>
                </div>
                <div className="card-body">
                    {willRerirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    <h4 className="font-weight-bold text-capitalize">{product.description.substring(0,30)+"..."}</h4>
                    <p>${product.price}</p>
                    <Link to={`product/${product._id}`}>
                        <button className="btn btn-round btn-rose mt-2 mb-2 mr-2">View Product</button>
                    </Link>
                    <Link to="/cart">
                        <button className="btn btn-round btn-default mt-2 mb-2" onClick={addToCart}>Add To Cart</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ProductCart;