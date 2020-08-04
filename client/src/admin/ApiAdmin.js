import API from "../config";
export const createCategory=(userId,token,category)=>{
    let data= fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
        .then(response=>{
            return response.json();
        })
        .catch(error=>{
            console.log(error)
        })
    return data;
}
export const createProduct=(userId,token,product)=>{
    let data= fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:(product)
    })
        .then(response=>{
            return response.json();
        })
        .catch(error=>{
            console.log(error)
        })
    return data;
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
export const listOrders=(userId,token)=>{
    return fetch(`${API}/orders/list/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const getStatusValues=(userId,token)=>{
    return fetch(`${API}/orders/status-values/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getProducts=()=>{
    return fetch(`${API}/products?undefined`,{
        method:"GET",
    })
        .then(response=>{
            return response.json()
        })
        .catch(error=>{
            console.log(error);
        })
}
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/update/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deleteProduct = (userId, token,productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const singleProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

