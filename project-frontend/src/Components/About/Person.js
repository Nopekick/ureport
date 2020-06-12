import React from 'react';
import "./About.css"

const imgStyle = {
  "borderRadius": "50%",
  "height" : "100px",
  "width" : "100px"
}

const pStyle = {
  "marginBottom" : "0px"
}

const descStyle = {
  "textAlign" : "center"
}



const Person = ({src, name, description}) => {
  return <div id="person">
    <img alt='face pic' style={imgStyle} src={src} />
    <p style={pStyle}><strong>{name}</strong></p>
    <p style={descStyle}>{description}</p>
   </div>
}

export default Person;
