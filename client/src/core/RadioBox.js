import React,{useState,useEffect,Fragment} from "react";

const RadioBox=({prices,handleFilters})=>{
    const [value,setValue]=useState(0);
    const handleChange=(event)=>{
        handleFilters(event.target.value)
        setValue(event.target.value);
    }
    return(
        prices.map(price=>{
            return(
                <Fragment key={price._id}>
                    <div className="form-group">
                        <div className="form-check form-check-radio">
                            <label className="form-check-label text-capitalize font-weight-bold text-dark">
                                <input className="form-check-input " type="radio"
                                       name="exampleRadios"
                                       id="exampleRadios1"
                                       onChange={handleChange}
                                       value={price._id}
                                />
                                {price.name}
                                <span className="circle">
                                    <span className="check"></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </Fragment>
            )
        })
    )
}
export default RadioBox;