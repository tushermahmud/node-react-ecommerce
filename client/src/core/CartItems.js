import React, {useEffect, useState} from "react";
import ShowImage from "./ShowImage";
import {updateItem,removeItem} from "./CartHelpers";
const CartItems=({product,run,setRun})=>{
    const [count,setCount]=useState(product.count)
    const [increase,setIncrease]=useState(false)
    const [decrease,setDecrease]=useState(false)


    const deleteProductFromCart=productId=>event=>{
        removeItem(productId)
        setRun(!run)
    }
    const increaseItem=productId=>event=>{
        setIncrease(true)
        setCount(count<1&&increase?1:count+1)
        if(count>0){
            updateItem(productId,count+1)
        }
        setIncrease(false)
        setRun(!run)

    }
    const decreaseItem=productId=>event=>{
        setDecrease(true)
        setCount(count<1&&decrease?1:count-1)
        if(count>0){
            updateItem(productId,count-1)
        }
        setDecrease(false)
        setRun(!run)
    }

    const handleChange=()=>{

    }
    return(
        <tr key={product._id}>
            <td>
                <div className="img-container">
                    <ShowImage item={product} url="product"/>
                </div>
            </td>
            <td className="td-name">
                <a href="#jacket" className="text-uppercase text-dark font-weight-bold">{product.name}</a>
                <br/>
                <small>by Dolce&amp;Gabbana</small>
            </td>
            <td className="td-number">
                <small>$</small>{product.price}
            </td>
            <td className="td-number">

                <div className="btn-group btn-group-sm" style={{display:"table",margin:"auto"}}>
                        <button className="btn btn-round btn-rose"  onClick={decreaseItem(product._id)}><i
                            className="material-icons">remove</i>
                            <div className="ripple-container"></div>
                        </button>
                        <input type="number" className="cart-input" name="count" value={count} onChange={handleChange}/>
                        <button  className="btn btn-round btn-rose" onClick={increaseItem(product._id)}><i
                            className="material-icons">add</i>
                            <div className="ripple-container"></div>
                        </button>

                </div>
            </td>
            <td className="td-number">
                <small>$</small>{count*product.price}
            </td>
            <td className="td-actions">
                <button type="button" rel="tooltip" data-placement="left" title=""
                        className="btn btn-link remove-button" data-original-title="Remove item" onClick={deleteProductFromCart(product._id)}>
                    <i className="material-icons">delete</i>
                </button>
            </td>
        </tr>

    )
}
export default CartItems