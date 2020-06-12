import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import "../Signin/Signin.css"
import {apiCall,setTokenHeader} from "../../services"
import jwt_decode from 'jwt-decode'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      school: '5bdba6bd7b593e17982b23b8'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if(this.props.isAuthenticated === true){
      this.props.history.push("/report")
    }

    // apiCall("get", `http://localhost:8081/api/school/schools)
    // .then(({schools})=>{
    //   this.setState({schools})
    // }).catch((err)=>{
    //     console.log(err)
    // })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSelect = (e) => {
    this.setState({school: e.target.value}, function(){
      console.log(this.state)
    })
  }

handleSubmit(e){
  e.preventDefault()
  apiCall("post", "https://ureport-server.herokuapp.com/api/auth/signup", this.state).then(({ token })=>{
    setTokenHeader(token)
    this.props.signIn()
    // this.props.setSchool(jwt_decode(token).)
    if(jwt_decode(token).isAdmin === true){
      this.props.setAdmin();
    }
    this.props.history.push('/report')
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
                <input required onChange={this.handleChange} type = "text" name = "fname" placeholder="First Name"/>

                <label>Last Name</label>
                <input required onChange={this.handleChange} type = "text" name = "lname" placeholder="Enter your last name..."/>

                <label>School</label>
                <select value={this.state.school} onChange={this.handleSelect} name = "school" placeholder="my school...">
                  <option value='5bdba6bd7b593e17982b23b8'>  University Preparatory Academy </option>
                </select>

                <label>Email</label>
                <input required onChange={this.handleChange} type = "text" name="email" placeholder="email"/>

                <label>Password</label>
                <input required onChange={this.handleChange} type = "password" name="password" placeholder="password"/>

                 <button type="submit">Sign Up </button>
                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            </form>
         </div>
 )
}

}


export default withRouter(Signup);
