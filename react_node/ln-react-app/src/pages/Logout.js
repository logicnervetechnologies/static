import React from "react"
import Firebase from "../components/Firebase"


const Logout = () => {
    return (
        <>
            <h1>Lgout PAge</h1>
            <button onClick={()=> {Firebase.auth().signOut()}}>Sign out</button>
        </>
    )
}

export default Logout