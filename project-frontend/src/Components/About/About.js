import React from 'react'
import Person from "./Person"
import "./About.css"

import kevin from "./pics/kevin.jpg"
import josh from "./pics/josh.jpg"
import arnav from "./pics/arnav.jpg"
import thomas from "./pics/thomas.jpg"
// import vivek from "./pics/vivek.jpeg"

const About = () => {
  return <div id="aboutBox">
            <h2> Our Mission </h2>
              <p> Cheating is a pervasive problem at school. As high school students, we have experienced
              cheating firsthand and heard teachers complain of what an issue it is. We know that reporting
              cheating to a teacher feels like 'snitching', and people may target someone for doing this.
              We wanted to encourage this action by creating a safe, easy, and anonymous way to report cheating, bullying,
              or any problem at school. Ultimately, solving these problems will improve the school
              experience for everyone. We also want to prevent abuse of our service by putting certain
              safeguards in place.</p>
            <hr />
            <h2> Origins </h2>
              <p> Everything started with a programming club focused on web design. Established in
              early 2018, the Web Design Club of UPA set its sights on creating quality websites and applications.
              A team of heroes emerged. Four friends from this club created this website at a hackathon.
              </p>
            <hr />
            <h2 style={{"textAlign": "center"}}> Our Team </h2>
            <div id="people">
              <Person  name= "Thomas K." description="Thomas is the main creator of this website. He is the fullstack developer who worked on most of the improvements." src={thomas}/>
              <Person  name= "Kevin T." description="Kevin is a frontend desinger for uReport." src={kevin}/>
              <Person  name= "Joshua L." description="Josh is a frontend designer for uReport." src={josh}/>
              <Person  name= "Arnav V." description="Arnav is the lead frontend designer for uReport and conceptual architect." src={arnav}/>
            </div>
            <hr />
            <h4> FAQS </h4>
            <p> <em>Why can we only send reports once every 24 hours?</em> </p>
            <p> This is done to prevent the spamming of teachers and abuse of our service </p>
            <p> <em>How do I know if my report sent successfully?</em> </p>
            <p> You should receive an email if your report was sent successfully </p>
            <hr />
            <h4> Disclaimers </h4>
            <p> This site is an intermediary for messages. We do not ensure the validity of the messages,
            but we do try maintain recipient protections and general security. We reserve the right to hold your information
            in case sent messages are blatantly false, offensive, or contain expletives. We will not give out your
            information in any way however. Use the reports to keep an eye on suspected students,
            but do not expect reporter information.</p>
          </div>

}

export default About;
