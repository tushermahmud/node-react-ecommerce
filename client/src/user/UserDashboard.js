import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link,Redirect} from "react-router-dom";
import {getPurchaseHistory} from "./ApiUser";
import moment from "moment";

const UserDashboard=()=>{
    const [history,setHistory]=useState([])
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };
    useEffect(() => {
        init(_id, token);
    }, []);
    const userLinks=()=>(
        <div className="card md-5">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/cart">My Cart</Link>
                </li>
                <li className="list-group-item">
                    <Link to={`/profile/${_id}`}>Update Profile</Link>
                </li>
            </ul>
        </div>
    );
    const userInfo=()=>(
        <div className="card md-5 mb-5">
            <h3 className="card-header">User Informations</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role===1?"Admin":"Customer"}</li>
            </ul>
        </div>
    )
    const redirectToAdminDashboard=()=>(
        isAuthenticated().user.role===1?(<Redirect to="/admin/dashboard"/>):null
    )

    const userHistory=()=>(
        <div className="card mb-5 mt-5">
            <h2 className="card-header">Purchase History</h2>
            {history.map((h, j) => (
                    <div className="card" key={j}>
                        <ul className="list-group">
                            <div className="card-title" style={{paddingLeft:"2rem"}}>Order:{j+1}</div>
                            {h.products.map((product,i)=>(
                                <li className="list-group-item" key={i}>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <div style={{width:"100%"}}>
                                                <h6>Product price: ${product.name}</h6>
                                            </div>
                                            <div style={{width:"100%"}}>
                                                <h6>Product price: ${product.price}</h6>
                                            </div>
                                            <div style={{width:"100%"}}>
                                                <h6>Purchased date:{" "}
                                                    {moment(
                                                        product.createdAt
                                                    ).fromNow()}</h6>

                                            </div>
                                        </li>
                                    </ul>

                                </li>
                            ))}
                        </ul>
                    </div>
            ))}

        </div>
    )

    return(
            <Layout title={`G'day ${name}`} description="this is the ecommerce user dashboard" classname="container">
                {redirectToAdminDashboard()}
                <div className="row">
                    <div className="col-3">
                        {userLinks()}
                    </div>
                    <div className="col-9">
                        {userInfo()}
                        {userHistory()}
                    </div>
                </div>
            </Layout>
        )

}
export default UserDashboard;