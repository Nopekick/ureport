import React, {Component} from 'react';
import '../Signin/Signin.css';
import {apiCall} from "../../services.js"
import {Redirect, withRouter} from 'react-router-dom'

class Report extends Component {
  constructor(props){
    super(props)
    this.state = {
      recipientName: '',
      recipientEmail: '',
      school: '',
      problem: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.reportApi = this.reportApi.bind(this)
  }

  componentDidMount(){
    if(localStorage && !localStorage.token){
      this.props.history.push("/")
    }
  }


  reportApi(e){
    e.preventDefault()
    apiCall("post", "http://localhost:8081/api/email/report", this.state).then(() => {
      this.setState({
        recipientName: '',
        recipientEmail: '',
        school: '',
        problem: '',
        message: ''
      });
      this.props.history.push("/")
    }).catch((err) => {
      this.setState({
        recipientName: '',
        recipientEmail: '',
        school: '',
        problem: '',
        message: ''
      });
      this.props.history.push("/")
    })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return (
      <div className = "signin">
          <h1> Report </h1>
            <form onSubmit={this.reportApi}>
                  <div id = "text">Teacher Name</div>
                  <input onChange={this.handleChange} name="recipientName" type="text" placeholder="John Doe"/>
                  <div id = "text">Teacher Email</div>
                  <input onChange={this.handleChange} name="recipientEmail" type="email" placeholder="john@Doe.com"/>
                  <div id = "text">School Name</div>
                  <input onChange={this.handleChange} name="school" type="text" placeholder="City High School"/>
                  <div id = "text">Problem</div>
                  <input onChange={this.handleChange} name="problem" type="text" placeholder="cheating/drugs/alcohol/bullying"/>
                  <div id = "text">Report Message</div>
                  <textarea onChange={this.handleChange} name="message" placeholder="message..."></textarea>
                  <p><em> Note: False reports, expletives, or nonsense may get your account banned </em></p>
                  <button type = "submit">Submit </button>
            </form>
      </div>
    )
  }
}


export default withRouter(Report);
