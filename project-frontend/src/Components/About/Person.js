import React from 'react';

const imgStyle = {
  "borderRadius": "50%",
  "height" : "100px",
  "width" : "100px"
}

const divStyle = {
  "display" : "flex",
  "alignItems" : "center",
  "flexDirection" : "row",
  "justifyContent" : "space-between",
  "marginBottom" : "15px"
}



const Person = ({src, name, description}) => {
  return <div style={divStyle}>
    <img style={imgStyle} src={src} />
    <p><strong>{name}</strong></p>
    <p>{description}</p>
   </div>
}

export default Person;
