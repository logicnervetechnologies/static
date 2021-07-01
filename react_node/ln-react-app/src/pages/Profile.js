import React, {useState, useEffect} from 'react';
import axios from 'axios'

axios.defaults.withCredentials = true



const Profile = ({props}) => {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [items, setItems] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:5000/banana")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setItems(result.data);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])


  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <h1>{/* Loading message goes here */}</h1>;
  // } else return (
  //     <div className='home'>
  //       <h1>Profile {items}</h1>
  //     </div>
  //     )
    const [uData, setUData] = useState({})
    const getUserInfo = () => {
      axios.post("http://localhost:8000/info", {}).then((response)=>{
        console.log(response)
      })
    }
    return (
      <div id="profile">
        <button onClick={getUserInfo}>GET USER INFO</button>
      </div>
    )

}


export default Profile