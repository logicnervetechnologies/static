import React, { useState } from 'react';

const Patient = (props) => {
    if (props.location.state &&( props.location.state.pid !== localStorage.getItem('pid'))) {
        localStorage.setItem('pid', props.location.state.pid)
    }
const [pid, ] = useState(localStorage.getItem('pid') || null);
    


    //const pid = props.location.state ? props.location.state.pid: null;
    console.log("Props: " + pid);
    return (
        <div className='home'>
          <h1>Patient: {pid}</h1>
        </div>
        )

}


export default Patient