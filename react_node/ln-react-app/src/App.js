import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Page imports
import Dashboard from './pages/Dashboard'
import Module from './pages/Module'
import Profile from './pages/Profile';
import Patient from './pages/Patient'
import Team from './pages/Team';


// Component imports
import Nav from './components/Nav/Nav'


const App = () => {
  
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
}

export default App

