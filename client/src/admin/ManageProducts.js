import React,{useState,useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import ProductCreateForm from "../component/product/ProductCreateForm";
import {createProduct,getCategories} from "../admin/ApiAdmin";
import moment from "moment";
import {getProducts,deleteProduct} from "../admin/ApiAdmin";
import {Link} from "react-router-dom";

const ManageProducts=()=>{
    const [products,setProducts]=useState([]);
    const {user,token}=isAuthenticated()
    const [success,setSuccess]=useState(false)
    const loadProducts=()=>{
        getProducts()
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setProducts(data)
                }
            })
    }
    const destroyProduct=(productId)=>{
        deleteProduct(user._id,token,productId)
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setSuccess(true)
                    loadProducts()
                }
            })
    }
    const showSuccess=()=>(
        success?(<div className="alert alert-success">The Product is Successfully Deleted</div>):null
    )
    useEffect(()=>{
        loadProducts()
    },[])
    return(
        <Layout title="Manage Products" description="Manage All the Products Here" classname="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-group">
                        {showSuccess()}
                        {products.map((product,i)=>(
                            <li key={i} className="list-group-item d-flex justify-content-between align-center">
                                <strong>{product.name}</strong>
                                <Link to={`/admin/product/update/${product._id}`}>
                                    <span className="material-icons">
                                        edit
                                    </span>
                                </Link>
                                    <span style={{cursor:"pointer"}} className="material-icons" onClick={()=>destroyProduct(product._id)}>
                                        delete
                                    </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}
export default ManageProducts