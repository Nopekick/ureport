import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom'
import "../Signin/Signin.css"
import {apiCall,setTokenHeader} from "../../services"
import axios from 'axios'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

handleSubmit(e){
  e.preventDefault()
  apiCall("post", "http://localhost:8081/api/auth/signup", this.state).then(({ token })=>{
    setTokenHeader(token)
    //setTokenHeader()
    localStorage.jwtToken = token
    this.props.signIn()
    this.props.history.push('/report')
    console.log(axios.defaults.headers.common)
  }).catch((err)=>{
    console.log(err)
    this.props.history.push('/')
  })
}



render(){
  return (
    <div className="signin">
        <h1 id="signup"> Sign Up </h1>
          <form onSubmit={this.handleSubmit}>
                <label>First Name</label>
                <input onChange={this.handleChange} type = "text" name = "fname" placeholder="First Name"/>

                <label>Last Name</label>
                <input onChange={this.handleChange} type = "text" name = "lname" placeholder="Enter your last name..."/>

                <label>Email</label>
                <input onChange={this.handleChange} type = "text" name="email" placeholder="email"/>

                <label>Password</label>
                <input onChange={this.handleChange} type = "password" name="password" placeholder="password"/>

                 <button type="submit">Sign Up </button>
                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            </form>
         </div>
 )
}

}


export default withRouter(Signup);
