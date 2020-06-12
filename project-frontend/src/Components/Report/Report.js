import React, {Component} from 'react';
import '../Signin/Signin.css';
import {apiCall} from "../../services.js"
import { withRouter} from 'react-router-dom'

class Report extends Component {
  constructor(props){
    super(props)
    this.state = {
      problem: '',
      message: '',
      teacher: '',
      teachers: [],
      emailValidated: false,
      isBanned: false,
      timeDiff: 0,
      isWarned: false,
      name: '',
      received: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.reportApi = this.reportApi.bind(this)
  }

  componentDidMount(){
    if(!this.props.isAuthenticated===true){
      this.props.history.push("/")
    } else {
      if(this.props.schoolId){
        apiCall("get", `https://ureport-server.herokuapp.com/api/school/${this.props.schoolId}`)
        .then((teachers)=>{
          this.setState({teachers})
        }).catch((err)=>{
            console.log(err)
        })
      }

      apiCall("get", 'https://ureport-server.herokuapp.com/api/email/checkeligible')
      .then((data)=>{
        let {emailValidated,isBanned,isWarned,timeDiff, name} = data.obj
        this.setState({emailValidated, isBanned, isWarned, timeDiff, name, received: true})
      }).catch((err)=>{
          console.log(err)
      })
    }
  }

  reportApi(e){
    e.preventDefault()
    let obj = {
      problem: this.state.problem,
      message: this.state.message,
      teacher: this.state.teacher
    }
    apiCall("post", "https://ureport-server.herokuapp.com/api/email/report", obj)
    .then(() => {
      this.setState({
        problem: '',
        message: ''
      }, ()=> this.props.history.push("/"));
    }).catch((err) => {
      this.setState({
        problem: '',
        message: ''
      }, ()=> this.props.history.push("/"));

    })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSelect = (e) => {
    this.setState({teacher: e.target.value}, function(){
    })
  }

  render(){
    const teacherOptions = this.state.teachers.map((teacher)=>{
      return <option key={teacher._id} value={teacher._id}> {teacher.name} </option>
    })
    const time = 24 - this.state.timeDiff;
    const emailProb = <div className='prob'><h2> You have not validated your email yet
      and will be unable to send a report</h2></div>;
    const timeProb = <div className='prob'><h2> You are still on report cooldown and will be
      unable to send a report for {time} hours</h2></div>;
    const banProb = <div className='prob'><h2> You have been banned and will be unable
      to send a report</h2></div>;
    const infoBox = <div className='info'><h3> Hey {this.state.name}. You
        have not sent a report for {this.state.timeDiff} hours.
        {this.state.isWarned===true ? 'You have been warned for a previous report. Be careful with this report' : null}
        </h3></div>;

    const { emailValidated, timeDiff, isBanned } = this.state
    const status = this.state.received===false || emailValidated===false ||timeDiff<24 || isBanned===true;

    return (
      <div>
      {this.state.received===false ? null : (emailValidated===false ? emailProb :
        (timeDiff<24 ? timeProb : (isBanned ? banProb : infoBox)))}
        <div className = "signin">
            <h1> Report </h1>
              <form onSubmit={this.reportApi}>
                    <div id = "text">Teacher</div>
                    <select value={this.state.teacher} onChange={this.handleSelect} name="teacher" type="text" placeholder="John Doe">
                      {teacherOptions}
                    </select>
                    <div id = "text">Problem</div>
                    {status ? <input disabled required onChange={this.handleChange} name="problem" type="text" placeholder="unable to report"/> : <input required onChange={this.handleChange} name="problem" type="text" placeholder="cheating/drugs/alcohol/bullying"/> }
                    <div id = "text">Report Message</div>
                    {status ? <textarea disabled required onChange={this.handleChange} name="message" placeholder="unable to report"></textarea> : <textarea required onChange={this.handleChange} name="message" placeholder="message..."></textarea> }
                    <p id="warning"><em> Note: False reports, expletives, or nonsense may get your account banned. Once your report has been sent, it cannot be undone </em></p>
                  {status ? <button style={{"cursor": "default"}} disabled type = "submit">Unable to Report </button> : <button type = "submit">Submit </button> }
              </form>
        </div>
      </div>
    )
  }
}


export default withRouter(Report);
