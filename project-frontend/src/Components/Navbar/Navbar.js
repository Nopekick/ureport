import React from 'react';
import {Link} from 'react-router-dom'
import "./Navbar.css"

const Navbar = ({isAuthenticated, logout, isAdmin}) => {
  return isAuthenticated===true  ? (isAdmin===true ?
    (<div className="nav">
     <span><p id="title"> uReport </p></span>
       <div className="links">
         <span><Link to="/"> Home </Link></span>
         <span><Link to="/about"> About us </Link></span>
        <span><Link to="/report"> Report Now </Link></span>
        <span><Link to="/admin/messages"> View Reports </Link></span>
        <span><a onClick={logout}> Logout </a></span>
      </div>
   </div>)
   :
  (<div className="nav">
     <span><p id="title"> uReport </p></span>
       <div className="links">
         <span><Link to="/"> Home </Link></span>
         <span><Link to="/about"> About us </Link></span>
        <span><Link to="/report"> Report Now </Link></span>
        <span><a onClick={logout}> Logout </a></span>
      </div>
   </div>)
  )
    :
     (<div className="nav">
        <span><p id="title"> uReport </p></span>
        <div className="links">
          <span><Link to="/"> Home </Link></span>
          <span><Link to="/about"> About us </Link></span>
          <span><Link to="/signin"> Sign in </Link></span>
          <span><Link to="/signup"> Sign up </Link></span>
        </div>
      </div>)
  }

export default Navbar;
