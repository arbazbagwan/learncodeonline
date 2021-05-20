import Base from '../core/Base';

const signin = () =>{

    const signinForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left ">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email:</label>
                            <input className="form-control" type="email"></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password:</label>
                            <input className="form-control" type="password"></input>
                        </div>
                        <button  className="btn btn-block btn-success">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    const dummyform = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left ">
                    <h1>dummy</h1>
                </div>
            </div>
        )
    }

    return(
            <Base title="Sign In" description="A page to login for users!">
                  {signinForm()}
                  {dummyform()}
            </Base>
    )
}

export default signin;