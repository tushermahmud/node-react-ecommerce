import API from "../config";
export const getUserData=(userId,token)=>{
    return fetch(`${API}/user/${userId}`,{
        method:"GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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

export const updateProfile = (userId, token,user) => {
    return fetch(`${API}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const updateUserProfileLocalStroage=(user,next)=>{
    if(typeof window!=="undefined"){
        localStorage.getItem("login_token")
        let auth=JSON.parse(localStorage.getItem("login_token"))
        auth.user=user
        localStorage.setItem("login_token",JSON.stringify(auth))
        next()
    }
}
export const getPurchaseHistory = (userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
