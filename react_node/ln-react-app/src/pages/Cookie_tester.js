  
import React from 'react';
import axios from 'axios'
axios.defaults.withCredentials = true
const Cookie_tester = () => {


const createCookie = (e) => {

  axios.post('http://localhost:4000/login').then((res) =>{
    console.log(res.data)
  })
}
const deleteCookie = (e) => {
  axios.post('http://localhost:4000/logout')
}


	return (
		<div className="App">
      <h1>HTTP ONLY COOKIE DEMO</h1>
			<div className="box">
        <button className="button green" onClick={createCookie}>Create Cookies</button>
        <button className="button yellow">Renew Cookies</button>
        <button className="button red" onClick={deleteCookie}>Delete Cookie</button>
      </div>
		</div>
	);
}

export default Cookie_tester;