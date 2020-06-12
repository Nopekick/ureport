import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import "./Signin.css"
import {apiCall, setTokenHeader} from "../../services"
import jwt_decode from 'jwt-decode'

class Signin extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if(this.props.isAuthenticated === true){
      this.props.history.push("/report")
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    apiCall("post", "https://ureport-server.herokuapp.com/api/auth/login", this.state).then((data)=>{
        setTokenHeader(data.token)
        this.props.signIn()
        this.props.setSchool(jwt_decode(data.token).school)
        this.setState({
          email: '',
          password: ''
        }, ()=> this.props.history.push('/report'))

    }).catch((err)=>{
      console.log(err)
      this.props.history.push("/signin")
    })
  }


render(){
  return ( <div className="signin">
           <h1> Sign in </h1>
           <form onSubmit={this.handleSubmit}>
             <label>Email</label>
             <input onChange={this.handleChange} type="text" name="email" placeholder="john@email.com"/>
             <label>Password</label>
             <input onChange={this.handleChange} type="password" name="password" placeholder="password"/>
             <button type = "submit">Submit </button>
             <p>Dont have an account? <Link to="/signup"> Signup </Link></p>
            </form>
         </div>
 )
}

}


export default withRouter(Signin);
