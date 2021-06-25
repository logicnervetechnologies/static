import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import Firebase from "../components/Firebase";
import { AuthContext } from "../Auth";
import axios from "axios"

axios.defaults.withCredentials = true;

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await Firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(function(result) {
            axios.post('localhost:4000/login', {"id_token": result.user.getIdTokenResult})
              .then(loginResponse => {
                console.log(loginResponse);
              })
          })
          .catch(err => {
            console.log(err);
          });
        //TODO: GET ID TOKEN, SEND TO BACKEND AND GET ISSUED JWT

        let id_token = 

        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);