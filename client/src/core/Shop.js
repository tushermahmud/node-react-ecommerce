import React,{useState,useEffect} from "react";
import Layout from "./Layout";
import RadioBox from "./RadioBox";
import Price from "./PriceRange";
import {getCategories,getFilteredProducts} from "./ApiCore";
import CheckBox from "./CheckBox";
import ProductCart from "../component/product/ProductCard";

const Shop=()=>{
    const [categories,setCategories]=useState([])
    const [setError]=useState(false)
    const [skip,setSkip]=useState(0)
    const [limit,setLimit]=useState(3)
    const [size,setSize]=useState(0)
    const [myFilters,setMyFilters]=useState({
        filters:{
            category:[],
            price:[]
        }
    })
    const [filteredResult,setFilteredResult]=useState([])
    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResult([...filteredResult, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };
    const loadMoreButton=()=>{
        if(size>0&&size>=limit){
            return(
                <button onClick={loadMore} className="btn btn-rose">Load More</button>
            )
        }
    }
    const loadFilteredProducts=myfilter=>{
        getFilteredProducts(skip,limit,myfilter)
            .then(data=>{
                if(data.error){
                    setError(data.error)
                }else{
                    setFilteredResult(data.data)
                    setSize(data.size)
                    setSkip(0)
                }
            })
    }
    const init=async ()=>{
        await getCategories().then(data=>{
            if(data.error){
                setError({
                    error:data.error,
                })
            }else{
                setCategories( data)
            }
        })
            .catch(error=>{
                console.log(error)
            })
    }
    useEffect(()=>{
        init().then(response=>{
            return true
        });
        loadFilteredProducts(skip,limit,myFilters.filters)
    },[])
    const handleFilters=(filters,filterBy)=>{
        //console.log("shop"+filters,filterBy)
        const newFilters={...myFilters}
        newFilters.filters[filterBy]=filters
        if(filterBy==="price"){
            let priceValues=handlePrice(filters)
            newFilters.filters[filterBy]=priceValues
        }
        loadFilteredProducts(myFilters.filters)
        setMyFilters(newFilters)
    }
    const handlePrice=(filters)=>{
        const data=Price;
        let array=[];
        for(let key in data){
            if(data[key]._id===parseInt(filters)){
                array=data[key].array
            }
        }
        return array;
    }
    return(
        <Layout title="Shop Page" description="Buy your product" classname="container-fluid">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header card-header-rose">
                                <h4 className="font-weight-bold header-primary">Filter By Categories</h4>
                            </div>
                            <div className="card-body">
                                <ul style={{paddingLeft:"2px"}}>
                                    <CheckBox categories={categories} handleFilters={filters=>
                                        handleFilters(filters,"category")} />
                                </ul>
                            </div>
                        </div>
                        <div className="card mt-5">
                            <div className="card-header card-header-rose">
                                <h4 className="font-weight-bold header-primary">Filter By Price Range</h4>
                            </div>
                            <div className="card-body">
                                <div>
                                    <RadioBox prices={Price} handleFilters={filters=>
                                        handleFilters(filters,"price")} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            {filteredResult.map(product=><ProductCart key={product._id} product={product}/>)}
                        </div>
                        {loadMoreButton()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Shop;