import React,{useEffect} from 'react'
import {Link,useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {
  let navigate =  useNavigate();
  let location = useLocation();

  // logout function
  const logout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#0061ff"}}>
        <div className="container-fluid px-3">
            <Link className="navbar-brand" to="/">MAGIC</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
                </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex"><Link to="/signup" className="btn btn-danger btn-sm mx-1"><i className="fa-solid fa-user-plus"></i> SIGNUP</Link>
               <Link to="/login" className='btn btn-danger btn-sm mx-1'><i className="fa-solid fa-arrow-right-to-bracket"></i> LOGIN</Link></form>:<button onClick={logout} className='btn btn-danger btn-sm mx-1'><i className="fa-solid fa-door-open"></i> LOGOUT</button>}
            </div>
        </div>
        </nav>
    </div>
  )
}
