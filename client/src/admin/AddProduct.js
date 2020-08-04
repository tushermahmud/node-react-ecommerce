import React,{useState,useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import ProductCreateForm from "../component/product/ProductCreateForm";
import {createProduct,getCategories} from "../admin/ApiAdmin";

const AddProduct=()=>{
    const {user,token}=isAuthenticated();
    const [values,setValues]=useState({
        photo:"",
        name:"",
        description:"",
        price:"",
        categories:[],
        category:"",
        shipping:"",
        quantity:"",
        loading:false,
        error:"",
        createdProduct:"",
        redirectToProfile:"",
        formData:""
    });
    const {
        categories,
        loading,
        error,
        formData}=values;
    const init=async ()=>{
         await getCategories().then(data=>{
            if(data.error){
                setValues({
                    ...values,
                    error:data.error,
                })
            }else{
                setValues({
                    ...values,
                    error:data.error,
                    formData: new FormData(),
                    categories: data
                })
            }
        })
             .catch(error=>{
                 console.log(error)
             })
    }

    useEffect(()=>{
        init()
    },[]);
    const handleSubmit=(event)=>{
        event.preventDefault();
        setValues({
            ...values,error:"",loading: true
        })
        createProduct(user._id,token,formData)
            .then(product=>{
                if(product.error){
                    setValues({
                        ...values,
                        error:product.error
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
                        createdProduct:product.name,
                        formData:""
                    })
                }
            })

    }
    const showError=()=>(
        error?(<div className="alert alert-danger">{error}</div>):null
    )
    const showSuccess=()=>(
        values.createdProduct?(<div className="alert alert-success">The product is successfully created !</div>):null
    )
    const showLoading=()=>(
        loading?(<div className="alert alert-info"><h2>Loading...</h2></div>):null
    )
    const handleChange=(event)=>{
        const {name,value}=event.target;
        const formValue=name==="photo"?event.target.files[0]:value;
        formData.set(name,formValue);
        setValues({
            ...values,[name]:formValue
        })
    }

    const goBack=()=>{

    }
    return(
        <Layout title="Add New Product" description="this is the Create Product page" classname="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {showLoading()}
                    <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} goBack={goBack} categories={categories} values={values}/>
                </div>
            </div>
        </Layout>
    )
}
export default AddProduct;