import API from "../config";
import queryString from "query-string";
export const getProductsByArrivalBySell=sortBy=>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:"GET",
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const getCategories=()=>{
    return fetch(`${API}/categories`,{
        method:"GET",
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const getFilteredProducts=(skip,limit,filters)=>{
    const filterByData={
        skip,
        limit,
        filters
    }
    let data= fetch(`${API}/products/by/search`,{

        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify(filterByData)
    })
        .then(response=>{
            return response.json();
        })
        .catch(error=>{
            console.log(error)
        })
    return data;
}
export const list=params=>{
    const query=queryString.stringify(params)
    console.log(query)
    return fetch(`${API}/products/search?${query}`,{
        method:"GET",
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const read=productId=>{

    return fetch(`${API}/product/${productId}`,{
        method:"GET",
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const getRelatedProducts=(productId)=>{
    return fetch(`${API}/products/related/${productId}`,{
        method:"GET",
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const getBraintreeClientToken=(userId,token)=>{
    return fetch(`${API}/braintree/getToken/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const processPayment=(userId,token,paymentData)=>{
    return fetch(`${API}/braintree/payment/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
