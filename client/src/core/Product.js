import React,{useState,useEffect} from "react";
import Layout from "./Layout";
import {read,getRelatedProducts} from "./ApiCore";
import moment from "moment";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import ShowImage from "./ShowImage";
import {Link} from "react-router-dom";
const Product=(props)=>{
    const [product,setProduct]=useState({})
    const [relatedProducts,setRelatedProducts]=useState([])
    const [error,setError]=useState(false)
    const loadingSingleProduct=productId=>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                getRelatedProducts(data._id)
                    .then(products=>{
                        if(data.error){
                            setError(data.error)
                        }else{
                            setRelatedProducts(products)
                        }
                    })
            }
        })
    }
    useEffect(()=>{
        const productId=props.match.params.productId;
        loadingSingleProduct(productId)
    },[props])
    const showQuantity=()=>(
        product.quantity>0?(<span className="badge badge-pill badge-default">In Stock</span>):(
            <span className="badge badge-pill badge-default">Out Of Stock</span>)
    )

    return(
        <Layout title={product&&product.name} description={product&&product.description} classname="container-fluid">
            <div className="row">
                <div className="col-md-6 mt-4 col-lg-6">
                    <ShowImage item={product} url="product"/>
                </div>
                <div className="col-md-6 col-lg-6">
                    {product&&product.description&&<div className="card">
                        <div className="card-body">
                            <h4 className="text-capitalize font-weight-bold card-title">{product.name}</h4>
                            <p>${product.price}</p>
                            {showQuantity()}
                            <ul className="nav nav-pills nav-pills-rose mt-5">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#pill1" data-toggle="tab">
                                        Description
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#pill2" data-toggle="tab">
                                        Category
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#pill3" data-toggle="tab">
                                        Sold
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content tab-space">
                                <div className="tab-pane active" id="pill1">
                                    <p className="text-uppercase font-weight-bold">{product.description}</p>
                                </div>
                                <div className="tab-pane" id="pill2">
                                    <p className="text-uppercase font-weight-bold">{product.category.name}</p>
                                </div>
                                <div className="tab-pane" id="pill3">
                                    <p>Posted At:{moment(product.createdAt).fromNow()}</p>
                                    <p>Total Sold:{product.sold}</p>
                                </div>
                            </div>
                            <AnchorLink href="#related-product">
                                <button className="btn btn-round btn-rose mt-2 mb-2 mr-2">See Related Products</button>
                            </AnchorLink>
                            <Link to="/">
                                <button className="btn btn-round btn-default mt-2 mb-2">Add To Cart</button>
                            </Link>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-8 offset-md-2" id="related-product">
                    <h3 className="font-weight-bold text-uppercase text-center mt-5">Related Products</h3>
                    <div className="row">
                        {
                            relatedProducts.length!==0?relatedProducts.map(singleProduct=>
                                (
                                    <div className="card col-md-4" key={singleProduct._id}>
                                        <ShowImage classname="card-img-top" item={singleProduct} url="product"/>
                                        <div className="card-body">
                                            <Link to={`/product/${singleProduct._id}`}>
                                                <h4 className="card-title">{singleProduct.name}</h4>
                                            </Link>
                                            <p className="card-text">{singleProduct.description}</p>
                                        </div>
                                    </div>
                                )
                            ):(
                                <div className="col-12 alert alert-danger">No Related Products found !</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Product