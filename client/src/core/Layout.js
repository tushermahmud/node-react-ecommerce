import React from "react";
import "../styles.css";

const Layout=({title,description,classname,children})=>(
    <div>
        <div className="jumbotron">
            <h2 className="title text-capitalize">{title}</h2>
            <p className="lead text-capitalize">{description}</p>
        </div>
        <div className={classname}>{children}</div>
    </div >
)
export default Layout;