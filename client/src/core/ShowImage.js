import React from "react";
import API from "../config";

const ShowImage=({item,url})=>{
    const photo=`${API}/${url}/photo/${item._id}`

    return !item._id||!url?(<div className="image-loading"></div>):(
        <div className="product-image">
            <img src={photo} className="mb-3 card-img-top" alt={item.name}/>
        </div>
    )
}
export default ShowImage;