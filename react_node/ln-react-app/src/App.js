import React, {useState} from 'react'
import Sidebar from './components/user/sidebar'
import Search from './components/user/Search'
import ReactDOM from 'react-dom';

const user_data = {
  name:'banana man',
  role:'patient',
  email:'banana@fruit.com'
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function SignUpButton(props) {
  return (
    <button onClick={props.onClick}>
      Sign Up
    </button>
  );
}

function UserGreeting(props) {
  return (
  <h2>Welcome back {props.user.name}!</h2>
  );
}

function GuestGreeting(props){ 
  return (
    <div>
    <h2>Welcome! Please sign up or log in.</h2>
    </div>
  );
  
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting user={user_data}/>;
  }
  return <GuestGreeting SignUp={props.SignUpClick} LogIn={props.LogInClick}/>;
  
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.state = {
      isLoggedIn:false,
      user:null
    }
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true,
      user: user_data});
  }

  handleSignUpClick() {
    //this should probably do soemthing else
    this.setState({isLoggedIn: false});
  }

  render() {

    const isLoggedIn = this.state.isLoggedIn;
    let role;
    if (isLoggedIn) {
      if (this.state.user.role === 'patient') {
        role = <h1>Patient View</h1>;
      } else {
        role = <h1>Doctor View</h1>;
      }
      
    }

    return (
      <div className="mainbar">
      <div>
        <hr />
        <h1>App Landing page</h1>
        <Greeting isLoggedIn={this.state.isLoggedIn}/>
        <SignUpButton onClick={this.handleSignUpClick} />
        <LoginButton onClick={this.handleLoginClick} />
        {role}
      </div>
      </div>
    );
  }
}

export default App

