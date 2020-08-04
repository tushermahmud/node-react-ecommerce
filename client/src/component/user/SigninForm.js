import React from "react";

const signinForm=({handleChange,handleSubmit,loading})=>(
    <div>
        <div className="row">
            <div className="col-md-8 offset-md-2 mt-5">
                <div className="card">
                    <div className="card-header card-header-icon card-header-rose text-center">
                        <div className="card-icon">
                            <h3 className="font-weight-bold">Login</h3>
                        </div>
                    </div>
                    <div className="card-body mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input onChange={handleChange} type="email" name="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                       placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={handleChange} type="password" name="password"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                       placeholder="Enter Password"/>
                            </div>
                            {loading?(<button type="submit" className="btn btn-rose btn-round disabled mb-5">Submit</button>):(<button type="submit" className="btn btn-rose btn-round mb-5">Submit</button>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
export default signinForm;