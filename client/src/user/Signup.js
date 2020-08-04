import React,{useState} from "react";
import Layout from "../core/Layout";
import {Link} from "react-router-dom";
import {register} from "../auth";
import SignupForm from "../component/user/SignupForm";
const Signup=()=>{
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });
    const {name,email,password}=values;
    const handleChange=event=>{
        const{name,value}=event.target
        setValues({...values,error:false,[name]:value})
    }
    const handleSubmit=event=>{
        event.preventDefault();
        register({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
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
    const showSuccess=()=>{
        return(
            values.success?(<div className="alert alert-success">
                <div className="container-fluid">
                    <div className="alert-icon">
                        <i className="material-icons">check</i>
                    </div>
                    <button type="button" className="close">
                        <span aria-hidden="true"><i className="material-icons">clear</i></span>
                    </button>
                    <b>Success Alert:</b>Your Account is Created.Please <Link to="/signin">Sign in</Link> !
                </div>
            </div>):""
        )
    }
    return (
        <Layout title="Signup Page" description="node react ecommerce-app" classname="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            <SignupForm handleChange={handleChange} handleSubmit={handleSubmit}/>
        </Layout>
    );
}
export default Signup;