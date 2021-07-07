import React, { useCallback } from "react";
import { withRouter } from "react-router";
import Firebase from "../components/Firebase";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await Firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div class="signup-page">
      <h1>Sign up</h1>
      <div class="login-form">
        <form onSubmit={handleSignUp}>
          <label class="login-label">
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label class="login-label">
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);