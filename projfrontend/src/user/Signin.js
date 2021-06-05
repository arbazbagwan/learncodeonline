import React, { useState } from "react";
import {Redirect} from 'react-router-dom';
import Base from '../core/Base';
import {SignIn, isAuthenticated, authenticate} from '../auth/helper';

const Signin = () => {

    const [values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        didRedirect:false,
        loading:false
    })

    const {email, password, error, didRedirect, loading} = values;

    const {user} = isAuthenticated();
    
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

      const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        SignIn({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, loading:false})
            } else {
                authenticate(data, ()=>{
                    setValues({...values, didRedirect: true})
                })
            }
        })
        .catch(console.log("SIGN IN FAILED"));
      }

      const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <p>Redirect to Admin.</p>
            } else { return <p>Redirect to User Dashboard.</p> }
        }
        if(isAuthenticated()){
            return <Redirect to="/"></Redirect>
        }
      }

      const LoadingMessage = () =>{
        return (
            loading &&
                (<div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>)
            )
      }
    
      const errorMessage = () =>{
        return (
          <div className="row">
          <div className="col-md-4 offset-sm-4 text-center">
            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
         </div></div>
          </div>
        );
      }

    const signinForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left ">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email:</label>
                            <input className="form-control" type="email" onChange={handleChange("email")} value={email}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password:</label>
                            <input className="form-control" type="password" onChange={handleChange("password")} value={password}></input>
                        </div>
                        <button onClick={onSubmit} className="btn btn-block btn-success">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    
    return(
            <Base title="Sign In" description="A page to login for users!">
                  {LoadingMessage()}
                  {errorMessage()}
                  {signinForm()}
                  {performRedirect()}
                  <p className="text-white text-center">{JSON.stringify(values)}</p>
            </Base>
    )
}

export default Signin;