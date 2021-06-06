import React, { useState } from 'react';

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
        </div>
        )

}


export default Module