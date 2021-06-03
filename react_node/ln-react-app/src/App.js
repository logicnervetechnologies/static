import React, {useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Doc from './components/user/Doc'
import ReactDOM from 'react-dom';

const user_data = {
  name:'banana man',
  role:'doc',
  email:'banana@fruit.com'
}



function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Log Out
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
  const user = props.user;
  if (isLoggedIn) {
    return <UserGreeting user={user}/>;
  }
  return <GuestGreeting SignUp={props.SignUpClick} LogIn={props.LogInClick}/>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      signUp:false,
      isLoggedIn:false,
      user:null
    }
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true,
      user: user_data});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false,
      user: null});
  }

  handleSignUpClick() {
    //this should probably do soemthing else
    this.setState({signUp: true});
  }

  render() {
    if (this.state.signUp) {
      return (
        <div className="mainbar">
          <hr />
          <h1>Sign Up</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="providerID">
              <Form.Label>Provider ID</Form.Label>
              <Form.Control type="input" placeholder="Provider ID" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {
      if (this.state.user.role === 'patient') {
        return (
          <div className="mainbar">
            <hr />
            <h1>App Landing page</h1>
            <Col><Greeting isLoggedIn={this.state.isLoggedIn} user={this.state.user}/></Col>
            <Col><LogoutButton onClick={this.handleLogoutClick}/></Col>
          </div>
        );
      } else {
        return (
          <div className="mainbar">
            <h1>App Landing page</h1>
            <hr />
            <Container fluid>
              <Row>
                <Col md={1}>4<Greeting isLoggedIn={this.state.isLoggedIn} user={this.state.user}/></Col>
                <Col md={2}>2<LogoutButton onClick={this.handleLogoutClick}/></Col>
              </Row>
            </Container>
            <Doc/>
          </div>
        );
      }
    } else {
      return (
        <div className="mainbar">
        <div>
          <hr />
          <h1>App Landing page</h1>
          <Greeting isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <SignUpButton onClick={this.handleSignUpClick} />
          <LoginButton onClick={this.handleLoginClick} />
        </div>
        </div>
      );
    }

    
  }
}

export default App

