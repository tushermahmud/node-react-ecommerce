import React,{useState,useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import ProductUpdateForm from "./ProductUpdateForm";
import {updateProduct,getCategories,singleProduct} from "../admin/ApiAdmin";
import {withRouter} from "react-router-dom"
const UpdateProduct=({match})=>{
    const {user,token}=isAuthenticated();
    const [values,setValues]=useState({
        photo:false,
        name:"",
        description:"",
        price:"",
        categories:[],
        category:"",
        shipping:"",
        quantity:"",
        loading:false,
        error:false,
        createdProduct:"",
        redirectToProfile:false,
        formData:""
    });
    const {
        categories,
        loading,
        error,
        formData}=values;

    const init=(productId)=>{
        singleProduct(productId)
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }else{
                    setValues({...values,name:data.name,error:false,description:data.description,price:data.price,category:data.category,quantity:data.quantity,shipping: data.shipping,formData: new FormData})
                    initCategories()
                }
            })
    }
    const initCategories=()=>{
         getCategories().then(data=>{
            if(data.error){
                setValues({
                    ...values,
                    error:data.error,
                })
            }else{
                setValues({
                    categories: data,
                    formData: new FormData(),
                })
            }
        })
            .catch(error=>{
                console.log(error)
            })
    }

    useEffect(()=>{
        init(match.params.productId)
    },[]);
    const handleSubmit=(event)=>{
        event.preventDefault();
        setValues({
            ...values,error:"",loading: true
        })
        updateProduct(match.params.productId,user._id,token,formData)
            .then(data=>{
                if(data.error){
                    setValues({
                        ...values,
                        error:data.error
                    })
                }
                else{
                    setValues({
                        ...values,
                        photo:"",
                        name:"",
                        description:"",
                        price:"",
                        category:"",
                        quantity:"",
                        loading:false,
                        error:"",
                        createdProduct:data.name,
                        formData:""
                    })
                }
            })

    }
    const handleChange=(event)=>{
        const {name,value}=event.target;
        const formValue=name==="photo"?event.target.files[0]:value;
        formData.set(name,formValue);
        setValues({
            ...values,[name]:formValue
        })
    }
    const showError=()=>(
        error?(<div className="alert alert-danger">{error}</div>):null
    )
    const showSuccess=()=>(
        values.createdProduct?(<div className="alert alert-success">The product is successfully Updated !</div>):null
    )
    const showLoading=()=>(
        loading?(<div className="alert alert-info"><h2>Loading...</h2></div>):null
    )

    return(
        <Layout title="Update Product" description="Update the current product" classname="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {showLoading()}
                    <ProductUpdateForm handleChange={handleChange} handleSubmit={handleSubmit} categories={categories} values={values}/>
                </div>
            </div>
        </Layout>
    )
}
export default withRouter(UpdateProduct);