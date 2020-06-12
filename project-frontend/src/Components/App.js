import React, { Component } from 'react';
import Navbar from './Navbar/Navbar'
import {Switch, Route, withRouter} from 'react-router-dom'
import Signin from "./Signin/Signin"
import Signup from "./Signup/Signup"
import About from "./About/About"
import Report from "./Report/Report"
import Home from "./Home/Home"
import Message from "./MessageList/Message"
import MessageList from "./MessageList/MessageList"

import {setTokenHeader} from "../services.js"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: false,
      isAdmin: false,
      userSchool: ''
    }
  }

  userLoggedIn = () => {
    this.setState({ isAuthenticated: true})
  }

  setSchool = (userSchool) => {
      this.setState({userSchool})
  }

  setAdmin = () => {
    this.setState({isAdmin: true})
  }

  logout = () => {
    this.setState({isAuthenticated:false, isAdmin: false})
    setTokenHeader()
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <Navbar logout={this.logout} isAdmin={this.state.isAdmin} isAuthenticated={this.state.isAuthenticated} />
        <Switch>
          <Route path="/signin" component={()=> <Signin setSchool={this.setSchool} isAuthenticated={this.state.isAuthenticated} setAdmin={this.setAdmin} signIn={this.userLoggedIn}/>} />
          <Route path="/signup"  component={()=> <Signup setSchool={this.setSchool} isAuthenticated={this.state.isAuthenticated} setAdmin={this.setAdmin} signIn={this.userLoggedIn}/>}/>
          <Route path="/report" component={()=> <Report schoolId={this.state.userSchool} isAuthenticated={this.state.isAuthenticated} />} />}/>
          <Route path="/about" component={About} />
          <Route path="/admin/messages" component={()=> <MessageList isAdmin={this.state.isAdmin} />} />
          <Route path="/admin/message/:id" component={()=> <Message isAdmin={this.state.isAdmin} />} />
          <Route path="/" component={()=> <Home isAuthenticated={this.state.isAuthenticated}  />}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
