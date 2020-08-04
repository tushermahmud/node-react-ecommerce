import React from "react";
import {Link} from "react-router-dom";
const AddCategoryform=({handleSubmit,handleChange,name})=>{
    const goBack=()=>(
        <Link to="/admin/dashboard" className="btn btn-default">Go Back To Admin dashboard</Link>
    )
    return(
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="form-group mt-10">
                <label htmlFor="exampleInputEmail1">Category Name</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary">
                Create Category
            </button>
            {goBack()}
        </form>
    )
}
export default AddCategoryform;