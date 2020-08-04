import React from "react";
const SignupForm=({handleSubmit,handleChange})=>{
    return(
        <div>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header card-header-icon card-header-rose text-center">
                            <div className="card-icon">
                                <h3 className="font-weight-bold">Register</h3>
                            </div>
                        </div>
                        <div className="card-body mt-5">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Display Name</label>
                                    <input onChange={handleChange} type="text" name="name"  className="form-control" placeholder="Enter Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input onChange={handleChange} type="email" name="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                           placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" onChange={handleChange} className="form-control"  id="exampleInputPassword1" name="password" placeholder="Password"/>
                                </div>
                                <button type="submit" className="btn btn-rose btn-round mb-5">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default SignupForm;
