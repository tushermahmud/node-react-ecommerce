import React,{useState,useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link,withRouter,Redirect} from "react-router-dom";
import {getUserData,updateProfile,updateUserProfileLocalStroage} from "./ApiUser";
import Search from "../core/Search";
import ProductCart from "../component/product/ProductCard";

const Profile=({match})=>{
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        error:false,
        success:false
    })
    useEffect(()=>{
        init(match.params.userId)
    },[])
    const {name,email,password,error,success}=values
    const {user,token}=isAuthenticated()
    const init=(userId)=>{
        getUserData(userId,token)
            .then(data=>{
                if(data.error){
                    setValues({...values,error: true})
                }else{
                    setValues({...values,name: data.name,email: data.email })
                }
            })
    }
    const handleChange=(event)=>{
        const {name,value}=event.target
        setValues({...values,error: false,[name]:value})

    }
    const handleSubmit=event=>{
        event.preventDefault()
        updateProfile(match.params.userId,token,{name,email,password})
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    updateUserProfileLocalStroage(data,()=>{
                        setValues({...values,name:data.name,email:data.email,success:true})
                    })
                }
            })
    }
    const redirectUser=()=>(
        success?(<Redirect to="/cart"/>):""

    )
    const profileUpdateForm=(name,email,password)=>(
        <div className="card-body mt-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Display Name</label>
                    <input onChange={handleChange} type="text" name="name"  value={name} className="form-control" placeholder="Enter Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={handleChange} type="email" name="email"  value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} className="form-control"  id="exampleInputPassword1" name="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-info btn-round mb-5">Update Profile</button>
            </form>
        </div>
    )


    return (
        <Layout title="Your Profile" description="See Your Profile" classname="container-fluid">
            <div className="col-lg-10 offset-lg-1">
                {profileUpdateForm(name,email,password)}
                {redirectUser()}
            </div>
        </Layout>
    )
}
export default withRouter(Profile)