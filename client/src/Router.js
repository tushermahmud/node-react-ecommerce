import React from "react";
import {BrowserRouter,Redirect} from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import UserDashboard from "./user/UserDashboard";
import {Switch,Route} from "react-router-dom";
import Menu from "./core/Menu";
import PrivateRoute from "./auth/PrivateRoute";
import {isAuthenticated} from "./auth/index";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/Admindashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
const Routes=()=>{
    return(
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route exact path="/signup"
                       render={()=> isAuthenticated()!==false?
                           (<Redirect to="/"/>):
                           (<Signup/>)}/>
                <Route path="/" exact component={Home}/>
                <Route exact path="/signin"
                       render={()=> isAuthenticated()!==false?(<Redirect to="/"/>):
                        (<Signin userToken={isAuthenticated}/>)}
                />
                <PrivateRoute path="/user/dashboard" component={UserDashboard}/>
                <AdminRoute path="/admin/dashboard" component={AdminDashboard}/>
                <AdminRoute path="/admin/create/category" component={AddCategory}/>
                <AdminRoute path="/admin/create/product" component={AddProduct}/>
                <AdminRoute path="/admin/orders/manage" component={Orders}/>
                <AdminRoute path="/admin/products/manage" component={ManageProducts}/>
                <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct}/>
                <Route path="/shop" exact component={Shop}/>
                <PrivateRoute path="/cart" component={Cart}/>
                <PrivateRoute path="/profile/:userId" component={Profile}/>
                <Route path="/product/:productId" exact component={Product}/>

            </Switch>
        </BrowserRouter>

    )
}
export default Routes;