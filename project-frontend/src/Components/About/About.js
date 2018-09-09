import React from 'react'
import Person from "./Person"
import "./About.css"

import kevin from "./pics/kevin.jpg"
import josh from "./pics/josh.jpg"
import arnav from "./pics/arnav.jpg"
import thomas from "./pics/thomas.jpg"

const About = () => {
  return <div id="aboutBox">
            <h2> Our Mission </h2>
            <p> Everything started with a poorly designed school website. Riddled with bugs, poorly formated html, and a plethora of other problems, the website needed
            a total revamp. A team of heroes emerged. Established in early 2017, the Web Design Club of UPA set its sights on the website so others would never have to suffer
            again. </p>
            <h3> Our Team </h3>
              <Person  name= "Kevin Tong" description="Kevin enjoys learning advanced math in his spare time." src={kevin}/>
              <Person  name= "Thomas Kamm" description="Our glorious leader! He will gladly flex his knowledge on you." src={thomas}/>
              <Person  name= "Joshua Lawson" description="Josh is interested in dog e-commerce. He looks like Thomas." src={josh}/>
              <Person  name= "Arnav Verma" description="Arnav thinks CS is interesting but would rather go into Bio." src={arnav}/>
          </div>

}

export default About;
