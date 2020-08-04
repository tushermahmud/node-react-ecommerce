import React,{useState,useEffect} from "react";
import Layout from "./Layout";
import Search from "./Search";
import {getProductsByArrivalBySell} from "./ApiCore";
import ProductCart from "../component/product/ProductCard";
const Home=()=>{
    const [productsBySell,setProductsBySell]=useState([]);
    const [productsByArrival,setProductsByArrival]=useState([]);
    const [setError]=useState(false)


    useEffect(()=>{
        const loadProductBySell=()=>{
            return(
                getProductsByArrivalBySell('sold')
                    .then(data=>{
                        if(data.error){
                            setError({
                                error:data.error
                            })
                        }
                        else{
                            setProductsBySell(data)
                        }
                    })
            )
        }
        const loadProductByArrival=()=>{
            return(
                getProductsByArrivalBySell('createdAt')
                    .then(data=>{
                        if(data.error){
                            setError({
                                error:data.error
                            })
                        }
                        else{
                            setProductsByArrival(data)
                        }
                    })
            )
        }
        loadProductByArrival();
        loadProductBySell()
    },[])
    return (
        <Layout title="home Page" description="node react app" classname="container-fluid">
            <div className="col-lg-10 offset-lg-1">
                <Search/>
                <h2 className="mb-8">Best Sellers</h2>
                <div className="row">
                    {productsBySell.map(product=>(<ProductCart key={product._id} product={product}/>))}
                </div>
                <h2 className="mb-8">New Arrival</h2>
                <div className="row">
                    {productsByArrival.map(product=>(<ProductCart key={product._id} product={product}/>))}
                </div>
            </div>
        </Layout>
    );
}
export default Home;