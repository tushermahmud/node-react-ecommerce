import React from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";


const AdminDashboard=()=>{
    const {user:{name,email,role}}=isAuthenticated();
    const adminLinks=()=>(
        <div className="card md-5 col-12">
            <h4 className="card-header">Admin Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/category">Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/create/product">Create Product</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/orders/manage">Orders</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products/manage">Manage Products</Link>
                </li>
            </ul>
        </div>
    );
    const adminInfo=()=>(
        <div className="card md-5 col-12">
            <h3 className="card-header">Admin Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role===1?"Admin":"Customer"}</li>
            </ul>
        </div>
    )

    return(
        <Layout title={`G'day ${name}`} description="this is the ecommerce admin dashboard" classname="container">
            <div className="row">
                <div className="col-12 col-md-3">
                    {adminLinks()}
                </div>
                <div className="col-12 col-md-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )

}
export default AdminDashboard;