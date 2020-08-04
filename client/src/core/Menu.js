import React, {Fragment, useEffect} from 'react';
import {Link,withRouter} from "react-router-dom";
import {signout} from "../auth";
import {isAuthenticated} from "../auth";
import Logo from "../brand.jpg";
import {itemTotal} from "./CartHelpers";
import {Badge} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const isActive=(history,path)=> {
    if(history.location.pathname === path){
        return true
    }
    else{
        return  ;
    }
}


/*const sum = itemTotal().reduce((total, cart) => total + cart.count,0);*/
const AppMenu=(props)=> {
    useEffect(()=>{

    },[itemTotal()])
    return (
        <nav className="navbar navbar-expand-lg bg-rose">
            <div className="container-fluid">
                <div className="navbar-translate">
                    <a className="navbar-brand" href="/"><img src={Logo} style={{width:"40px",height:"40px"}} alt=""/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                    <li className={isActive(props.history,'/')?"nav-item active":"nav-item"}>
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className={isActive(props.history,'/shop')?"nav-item active":"nav-item"}>
                        <Link className="nav-link" to="/shop">Shop</Link>
                    </li>
                    {!isAuthenticated()?
                        (
                            <Fragment>
                                <li className={isActive(props.history,'/signin')?"nav-item active":"nav-item"}>
                                    <Link className="nav-link" to="/signin">Login</Link>
                                </li>
                                <li className={isActive(props.history,'/signup')?"nav-item active":"nav-item"}>
                                    <Link className="nav-link" to="/signup">Register</Link>
                                </li>
                            </Fragment>):(
                            <Fragment>
                                {isAuthenticated()&&isAuthenticated().user.role===0?
                                    (
                                        <li className={isActive(props.history,'/user/dashboard')?"nav-item active":"nav-item"}>
                                            <Link className="nav-link" to="/user/dashboard">
                                                Your Dashboard
                                            </Link>

                                        </li>
                                    )
                                    :
                                    (
                                        <li className={isActive(props.history,'/admin/dashboard')?"nav-item active":"nav-item"}>
                                            <Link className="nav-link" to="/admin/dashboard">Your Dashboard</Link>
                                        </li>
                                    )
                                }
                                <li className={isActive(props.history,'/signout')?"nav-item active":"nav-item"}>
                                    <span className="nav-link" onClick={()=>signout(()=>{
                                        props.history.push("/")
                                    })} style={{cursor:"pointer"}}>Signout</span>
                                </li>
                            </Fragment>
                        )
                    }
                    <li className={isActive(props.history,'/cart')?"nav-item active":"nav-item"}>
                        <Link className="nav-link" to="/cart">
                            <Badge badgeContent={itemTotal()} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </Link>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    );
}
export default withRouter(AppMenu);