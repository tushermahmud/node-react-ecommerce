import React,{useState,useEffect} from "react";
import {getCategories,list} from "./ApiCore";
import ProductCart from "../component/product/ProductCard";
import {Link} from "react-router-dom";
const Search=()=>{
    const [data,setData]=useState({
        categories:[],
        category:"",
        search:"",
        results:[],
        searched:false
    })
    const {categories,category,search,results,searched}=data

    const loadCategories=()=>{
        getCategories()
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    setData({...data,categories:data})
                }
            })
    }
    useEffect(()=>{
        loadCategories()
    },[])
    const searchedData=()=>{
        if(search){
            list({search:search||undefined,category:category})
                .then(response=>{
                    if(response.error){
                        console.log(response.error)
                    }else{
                        setData({...data,results: response,searched:true})
                    }
                })
        }
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        searchedData()
    }
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setData({...data,[name]:value,searched: false})
    }
    const searchedProducts=(results)=>{
        if(results){
            return(
                results.map(product=>(<ProductCart key={product._id} product={product}/>))
            )
        }else{
            return null
        }
    }
    const searchedAlert=(searched,results)=>{
        if(searched&&results.length>0){
            return(
                <div className="alert alert-success">
                    <div className="container-fluid">
                        <div className="alert-icon">
                            <i className="material-icons">check</i>
                        </div>
                        <button type="button" className="close">
                            <span aria-hidden="true"><i className="material-icons">clear</i></span>
                        </button>
                        <b>Success Alert:</b>{results.length} Products Found !
                    </div>
                </div>
            )
        }
        else if (searched&&results.length<1){
            return(
                <div className="alert alert-danger">
                    <div className="container-fluid">
                        <div className="alert-icon">
                            <i className="material-icons">check</i>
                        </div>
                        <button type="button" className="close">
                            <span aria-hidden="true"><i className="material-icons">clear</i></span>
                        </button>
                        <b>Error Alert:</b>`No Product Found !`
                    </div>
                </div>
            )
        }
    }



    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label htmlFor="exampleFormControlSelect1">Select Category</label>
                        <select className="form-control selectpicker" data-style="btn btn-link"
                                id="exampleFormControlSelect1" name="category" onChange={handleChange}>
                            <option>Choose...</option>
                            {categories.map(category=><option className="text-capitalize" key={category._id} value={category._id}>{category.name}</option>)}

                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Search By Name</label>
                        <input type="text" className="form-control" id="inputCity" placeholder="Search By Name" name="search" onChange={handleChange}/>
                    </div>
                    <div className="form-group col-md-1 mt-3">
                        <button className="btn btn-rose">Search</button>

                    </div>
                </div>
            </form>
            <div>
                {searchedAlert(searched,results)}

                <div className="row">
                    {searchedProducts(results)}
                </div>
            </div>
        </div>
    )

}
export default Search;