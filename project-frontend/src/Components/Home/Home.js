import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = ({isAuthenticated}) => {
      return <div id="homepic">
                <div id = "home">
                    <h1 id="hero">Welcome to uReport!</h1>
                    <h2 id="hero-small">A Site to Anonymously Report Issues at your School</h2>
                    <p id="sub">UReport allows students to anonymously report bullying/cheating/drugs/alcohol and other problems going on at their school, without the stigma of being a "snitch". File a report today with a simple click! </p>

                    {isAuthenticated===true ?
                       <Link to="/report" id="crea">Report Now!</Link>
                       :  <Link to="/signup" id="crea">Sign Up Today!</Link>}

                </div>
            </div>

}

export default Home
