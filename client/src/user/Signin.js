import React, {useState} from "react";
import Layout from "../core/Layout";
import {login,authenticate,isAuthenticated} from "../auth"
import SigninForm from "../component/user/SigninForm";
import {Redirect} from "react-router-dom";

const Signin=()=>{
    const [values,setValues]=useState({
        email:'',
        password:'',
        error:'',
        success:false,
        loading:false,
        referToRedirect:false
    });
    const {user}=isAuthenticated();
    const {email,password}=values;

    const handleChange=event=>{
        const{name,value}=event.target
        setValues({...values,error:false,[name]:value})
    }
    const handleSubmit=event=>{
        event.preventDefault();
        setValues({ ...values, error: false,loading:true });
        login({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false,loading:false });
            } else {
                authenticate(data);
                setValues({
                    ...values,
                    loading:false,
                    referToRedirect: true
                });
            }
        });
    }
    const referRedirect=()=>{
        if(values.referToRedirect){
            if(user&&user.role===1){
                return <Redirect to="/admin/dashboard"/>
            }else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const loadingShow=()=>{
        return(
            values.loading?(<div className="alert alert-info">
                <div className="container-fluid">

                    <button type="button" className="close">
                        <i className="material-icons">clear</i>
                    </button>
                    <b><span className="loading">
                    </span><span>Loading...</span></b>
                </div>
            </div>):""
        )
    }

    const showError=()=>{
        return(
            values.error?(<div className="alert alert-danger">
                    <div className="container-fluid">
                        <div className="alert-icon">
                            <i className="material-icons">error_outline</i>
                        </div>
                        <button type="button" className="close">
                            <i className="material-icons">clear</i>
                        </button>
                        <b>Error Alert:</b> {values.error}
                    </div>
                </div>):""
        )
    }

    return (
        <Layout title="Signin Page" description="node react ecommerce-app" classname="container">
            {referRedirect()}
            {loadingShow()}
            {showError()}
            <SigninForm handleChange={handleChange} handleSubmit={handleSubmit} loading={values.loading}/>
        </Layout>
    );
}
export default Signin;