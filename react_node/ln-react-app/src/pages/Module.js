import React, { useState } from 'react';
import axios from 'axios'

axios.defaults.withCredentials = true

const Module = (props) => {
    if (props.location.state &&( props.location.state.modId !== localStorage.getItem('modId'))) {
        localStorage.setItem('modId', props.location.state.modId)
    }
const [modId, ] = useState(localStorage.getItem('modId') || null);
    


    //const pid = props.location.state ? props.location.state.pid: null;
    console.log("Module: " + modId);
    return (
        <div className='home'>
          <h1>Module: {modId}</h1>
          <br />
          <button onClick={
              () => {
              axios.post("http://localhost:7000/posts")
              }
          }>Make Request To Form Module Example</button>
        </div>
        )

}


export default Module