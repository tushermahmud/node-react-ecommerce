import React,{useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import AddCategoryform from "../component/category/Create";
import {createCategory} from "../admin/ApiAdmin";

const AddCategory=()=>{
    const [name,setName]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    //destructing use info and token from localstorage
    const {user,token}=isAuthenticated()
    const handleSubmit=(event)=>{
        event.preventDefault()
        setError("")
        setName(name)
        setSuccess(false)
        //making a request to api to make the category

        createCategory(user._id,token,{name})
            .then(category=>{
                if(category.error){
                    setError(category.error)
                }else{
                    setSuccess(true);
                    setName("")
                }

            })
    }
    const handleChange=(event)=>{
        setError("");
        setName(event.target.value)
    }
    const showSuccess=()=>(
        success?(<div className="alert alert-success">
            <div className="container-fluid">
                <div className="alert-icon">
                    <i className="material-icons">check</i>
                </div>
                <button type="button" className="close">
                    <span aria-hidden="true"><i className="material-icons">clear</i></span>
                </button>
                <b>Success Alert:</b> Category is created successfully
            </div>
        </div>):""
    )
    const showError=()=>(
        error?(<div className="alert alert-danger">
            <div className="container-fluid">
                <div className="alert-icon">
                    <i className="material-icons">error_outline</i>
                </div>
                <button type="button" className="close">
                    <i className="material-icons">clear</i>
                </button>
                <b>Error Alert:</b> Category name must be unique !
            </div>
        </div>):""
    )

    return(
        <Layout title="Add New Category" description="this is the Create category page" classname="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    <AddCategoryform handleSubmit={handleSubmit} handleChange={handleChange} name={name}/>
                </div>
            </div>
        </Layout>
    )
}
export default AddCategory;