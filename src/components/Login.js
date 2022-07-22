import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const {showAlert}  = props;
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({email: "", password:""});
    const login = async (e)=>{
        e.preventDefault();
         // API CALL
        const url = `https://magic---notes.herokuapp.com/api/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
                localStorage.setItem("token",json.authToken);
                setCredentials({email: "", password:""});
                navigate("/");
        }
        else{
            showAlert("danger","Invalid Credentials!");
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value});

    }
  return (
    <div className="container my-5">
        <div className="row">
            <div className="col-md-7 col-11 mx-auto">
                <div className="px-3 pt-4 pb-4 rounded shadow-lg bg-primary text-white">
                    <form id="login-form" onSubmit={login}>
                        <div className="mb-5">
                            <h5 className="text-light fw-normal">LOGIN TO YOUR ACCOUNT</h5>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name='email' placeholder="Enter Email...." value={credentials.email} onChange={onChange} required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' value={credentials.password} placeholder="Enter Password...." onChange={onChange} required/>
                        </div>
                        <div>
                            <button className="btn btn-light btn-sm"><i className="fa-solid fa-arrow-right-to-bracket"></i> LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
