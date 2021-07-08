import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Page imports
import Add_Patient from './pages/Add_Patient';
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Module from './pages/Module'
import Profile from './pages/Profile';
import Patient from './pages/Patient'
import Signup from './pages/Signup'
import Team from './pages/Team';
import VerifyEmail from './pages/VerifyEmail'

// Component imports
import { AuthProvider } from "./Auth"
import PrivateRoute from './PrivateRoute'
import Cookie_tester from './pages/Cookie_tester';


const App = () => {
    return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute path="/add_patient" exact component={Add_Patient} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path="/" component={Homepage} />
          <PrivateRoute path='/profile' exact component={Profile} />
          <PrivateRoute path="/patient" exact component={Patient} />
          <PrivateRoute path="/module" exact component={Module} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cookie" component={Cookie_tester} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/verify" component={VerifyEmail} />
        </div>
      </Router>
    </AuthProvider>
    
    
    )


}


export default App

