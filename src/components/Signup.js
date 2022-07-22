import React, { useState } from 'react'

const Signup = (props) => {
    const {showAlert}  = props;
    const [credentials,setCredentials] = useState({name:"",email:"",password:""});

  const signup =  async (e)=>{
    e.preventDefault();
    // API CALL
    const url = `https://magic---notes.herokuapp.com/api/auth/CreateUser`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    // eslint-disable-next-line
    if(json.success){
        setCredentials({name:"",email:"",password:""});
        showAlert("success","User Created Successfully!");
    }
    else{
        showAlert("danger","User Already Exist!");
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name] : e.target.value});
  }
  return (
    <div className="container my-5">
        <div className="row">
            <div className="col-md-7 col-11 mx-auto">
                <div className="px-3 pt-4 pb-4 rounded shadow-lg bg-primary text-white">
                    <form id="signup-form" onSubmit={signup}>
                        <div className="mb-5">
                            <h5 className="text-light fw-normal">SIGNUP YOUR ACCOUNT</h5>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name='name' placeholder="Enter Name...." value={credentials.name} onChange={onChange} required/>
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
                            <button className="btn btn-light btn-sm"><i className="fa-solid fa-user-plus"></i> SIGNUP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
