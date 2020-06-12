import React, {Component} from "react"
import {apiCall} from "../../services"
// import {jwt_decode} from 'jwt-decode'
import {withRouter, Link} from 'react-router-dom'
import "./Messages.css"

class MessageList extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    if(!this.props.isAdmin===true){
        this.props.history.push("/")
    } else {
      apiCall("get", "https://ureport-server.herokuapp.com/api/admin/messages")
      .then(({messages})=>{
        this.setState({messages})
      }).catch((err)=>{
          console.log(err)
      })
    }
  }

  render(){
    const messages = this.state.messages.map((mes, index)=>{
      const {recipientName, recipientEmail, problem, school, message, _id} = mes
      const url = '/admin/message/'+ _id
      return <div key={_id} id="individual">
          <div id="top-row">
            <span>Sent to <strong>{recipientName}</strong> at <strong>{recipientEmail}</strong></span>
            <span>School: {school} </span>
          </div>
          <span>Problem: {problem} </span>
        <p>Message: {message.substring(0,50)}... <Link to={url}> View Message</Link></p>
      </div>
    })
    return (
        <div>
          <h2 style={{"textAlign": "center", "marginBottom":"-30px"}}> Messages </h2>
          <hr/>
          <div>
            {messages}
          </div>
        </div>
    )
  }
}

export default withRouter(MessageList)
