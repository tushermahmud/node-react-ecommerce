import React from "react";
const ProductUpdateForm=({handleChange,handleSubmit,goBack,categories,values})=>{
    const getAllCategories=categories=>{
        return categories.map(category=>(<option value={category._id} key={category._id}>{category.name}</option>))
    }
    console.log(values)
    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h4>Photo</h4>
            <div className="form-group">
                <label htmlFor="photo" className="btn btn-rose btn-lg btn-round">
                    <i className="material-icons">photo</i> photo
                </label>
                <input type="file" id="photo" name="photo" accept="image/*" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    value={values.name}
                    autoFocus
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description</label>
                <textarea onChange={handleChange}
                          type="text"
                          name="description"
                          className="form-control"
                          placeholder="Enter Description"
                          value={values.description}
                          autoFocus
                          required
                >

                </textarea>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Price</label>
                <input
                    onChange={handleChange}
                    type="number"
                    name="price"
                    value={values.price}
                    className="form-control"
                    placeholder="Enter price"
                    autoFocus
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Category</label>
                <select
                    onChange={handleChange}
                    name="category"
                    className="form-control"
                    value={values.category}
                    required
                >
                    <option>Choose...</option>
                    {getAllCategories(categories)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Shipping</label>
                <select
                    onChange={handleChange}
                    name="shipping"
                    className="form-control"
                    value={values.shipping}
                    required
                >
                    <option value="0">No</option>
                    <option value="1">Yes</option>

                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Quantity</label>
                <input
                    onChange={handleChange}
                    value={values.quantity}
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter Quantity"
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-rose">Update Product</button>
        </form>
    )
}
export default ProductUpdateForm;