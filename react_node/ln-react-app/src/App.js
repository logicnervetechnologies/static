import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Page imports
import Add_Patient from './pages/Add_Patient';
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Module from './pages/Module'
import Profile from './pages/Profile';
import Patient from './pages/Patient'
import Signup from './pages/Signup'
import Team from './pages/Team';


// Component imports
import Nav from './components/Nav/Nav'
import { AuthProvider } from "./Auth"
import PrivateRoute from './PrivateRoute'
import Cookie_tester from './pages/Cookie_tester';


const App = () => {
  var login = false;
 
  if (login) {  
    return (
      
      <Router>
      {/* Navigation*/}
      <Nav />
      <Switch>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/profile' exact component={Profile} />
        {/*<Route path='/patient' exact component={Patient} />*/}
        <Route path="/patient" render={(props) => <Patient {...props} key={Date.now()}/>} />
        <Route path="/module" render={(props) => <Module {...props} key={Date.now()}/>} />
        {/* <Route path='/reports' exact component={Reports} />
        <Route path='/reports/reports1' exact component={ReportsOne} />
        <Route path='/reports/reports2' exact component={ReportsTwo} />
        <Route path='/reports/reports3' exact component={ReportsThree} /> */}
        <Route path='/team' exact component={Team} />
      </Switch>
    </Router>
    );
  } else {
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
        </div>
      </Router>
    </AuthProvider>
    
    
    )
  }
  


}


export default App

