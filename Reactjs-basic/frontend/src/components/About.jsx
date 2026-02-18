import React from 'react'


const About = (props) => {//props is used to pass the data from child component(About.jsx) to parent(App.jsx)
  return (
<div style={{marginTop:"60px"}} >
    <p>About Page</p>
    <b>Name:{props.name}</b>--
    <b>Locations:{props.location}</b>
</div> 
 )
}

export default About