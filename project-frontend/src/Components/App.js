import React, { Component } from 'react';
import Navbar from './Navbar/Navbar'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Signin from "./Signin/Signin"
import Signup from "./Signup/Signup"
import About from "./About/About"
import Report from "./Report/Report"
import Home from "./Home/Home"

import {apiCall, setTokenHeader} from "../services.js"

if (localStorage.jwtToken) {
  setTokenHeader(localStorage.jwtToken);
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: false,
      curUser: {
        _id: '',
        email: ''
      }
    }
  }

  componentDidMount() {
    if(localStorage && localStorage.jwtToken){
      this.setState({isAuthenticated: true})
    } 
  }

  userLoggedIn = () => {
    //auto bind
    this.setState({ isAuthenticated: true })
  }

  logout = () => {
    this.setState({isAuthenticated:false, curUser: {}})
    setTokenHeader()
    localStorage.clear()
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <Navbar logout={this.logout} isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signin" component={()=> <Signin signIn={this.userLoggedIn}/>} />
          <Route path="/signup"  component={()=> <Signup signIn={this.userLoggedIn}/>}/>
          <Route path="/report"  component={Report}/>
          <Route path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
