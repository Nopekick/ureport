import React, {Component} from 'react'
import { apiCall } from '../../services'
import { withRouter, Link } from 'react-router-dom'
import "./Messages.css"

class Message extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      recipientName: '',
      recipientEmail: '',
      problem: '',
      message: '',
      school: ''
    }
  }

  componentDidMount(){
    if(this.props.isAdmin){
      apiCall("get", `https://ureport-server.herokuapp.com/api/admin/message/${this.props.match.params.id}`)
      .then((data)=>{
        const {user, recipientName, recipientEmail, problem, message, school} = data.message
        this.setState({user, recipientName, recipientEmail, problem, message, school})
      })
    } else {
      this.props.history.push("/")
    }
  }

  handleClick = (e) => {
    if(this.props.isAdmin){
      apiCall("post", `http://localhost:8081/api/admin/ban/${this.state.user._id}`)
      .then(()=>{
        this.props.history.push("/admin/messages")
      }).catch((err)=>{
          console.log(err)
          this.props.history.push("/admin/messages")
      })
    }
    this.props.history.push("/")
  }

  render(){
    return (
      <div>
        <div id="messageBox">
          <Link style={{"color": "blue"}} to={'/admin/messages'}> Back to messages </Link>
          <p>Message sent to: {this.state.recipientName} at {this.state.recipientEmail}</p>
          <p>School: {this.state.school}</p>
          <p>Problem: {this.state.problem}</p>
          <p>Message: {this.state.message}</p>
          <button onClick={this.handleClick}> Ban User </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Message)
