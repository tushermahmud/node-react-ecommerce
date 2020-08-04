import React from "react";
export const addItem=(item,next)=>{
    let cart=[];
    if(typeof window !=="undefined"){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count:1,

        })
        cart=Array.from(new Set(cart.map(product=>(product._id)))).map(productId=>{
            return cart.find(product=>product._id===productId)
        });
        localStorage.setItem('cart',JSON.stringify(cart))
        next()
    }
}

export const itemTotal=()=>{
    let total=[]
    if(typeof window!==undefined){
        if(localStorage.getItem('cart')){
            total=JSON.parse(localStorage.getItem('cart'))
            return total.reduce((total,cartItems)=>total+cartItems.count,0)
        }
    }
    return 0
}
export const getCartItems=()=>{
    if(typeof window!==undefined){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return [];
}
export const updateItem=(productId,count)=>{

    let cart=[];
    if(typeof window!=="undefined"){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
    }
    cart.map((product,i)=>{
        if(product._id===productId){
            cart[i].count=parseInt(count)
        }
    })
    localStorage.setItem('cart',JSON.stringify(cart))

}
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};
export const emptyCart=()=>{
    let cart=[]
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            localStorage.removeItem("cart");
        }
    }
}

