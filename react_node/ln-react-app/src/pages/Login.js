import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import Firebase from "../components/Firebase";
import { AuthContext } from "../Auth";
import axios from "axios"
import '../styles/loginpage.css'
import '../styles/loginform.css'

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
          .then(async function(result) {
            const id_token = await result.user.getIdToken()
            console.log(id_token)
            axios.post('http://localhost:4000/login', {"id_token": id_token})
              .then(loginResponse => {
                console.log(loginResponse);
              })
          })
          .catch(err => {
            console.log(err);
          });

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
    <div class="login-page">
      <h1>Log in</h1>
      <div class="login-form">
      <form onSubmit={handleLogin}>
        <label class="login-label">
          Email:
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label class="login-label">
          Password: 
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      </div>
    </div>
  );
};

export default withRouter(Login);