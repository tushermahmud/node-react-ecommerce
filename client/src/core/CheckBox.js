import React,{useState,useEffect} from "react";


const CheckBox=({categories,handleFilters})=> {
    const [checked,setChecked]=useState([]);
    const handleToggle=categoryId=>()=>{
        //return the first index of -1
        const currentCategoryId=checked.indexOf(categoryId);
        //if current checked array is not filled up with the id the we have to push it to array
        const newCheckedCategoryId=[...checked];
        if(currentCategoryId===-1){
            newCheckedCategoryId.push(categoryId)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)

    }
    return(
        categories.map(category=>{
            return(
                <li className="list-unstyled" key={category._id}>
                    <div className="form-group">
                        <div className="form-check">
                            <label className="form-check-label text-capitalize font-weight-bold text-dark">
                                <input className="form-check-input " type="checkbox"
                                       onChange={handleToggle(category._id)}
                                       value={checked.indexOf(category._id === -1)}
                                />
                                    {category.name}
                                    <span className="form-check-sign">
                                    <span className="check"></span>
                                    </span>
                            </label>
                        </div>
                    </div>
                </li>
            )
        })

    )
}
export default CheckBox;