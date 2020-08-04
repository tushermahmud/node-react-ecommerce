import API from "../config";
export const register=(user)=>{
    let data= fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then(response=>{
            return response.json();
        })
        .catch(error=>{
            console.log(error)
        })
    return data;
}
export const login=(user)=>{
    let data= fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then(response=>{
            return response.json();
        })
        .catch(error=>{
            console.log(error)
        })
    return data;
}
export const authenticate=(data)=>{
    if(typeof window!="undefined"){
        localStorage.setItem('login_token',JSON.stringify(data));
    }
}
export const signout=(callback)=>{
    if(typeof window!="undefined"){
        localStorage.removeItem('login_token');
        callback()
        return fetch(`${API}/signout`,{
            method:"GET"
        }).then(response=>{
            console.log("signout",response)
        }).catch(error=>{
            console.log(error);
        })
    }
}

export const isAuthenticated=()=>{
    if(typeof window!="undefined"){
       if( localStorage.getItem('login_token')){
           return JSON.parse(localStorage.getItem('login_token'))
       }else{
           return false
       }
    }
    else{
        return false
    }
}
