import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Page imports
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile';
import Team from './pages/Team';


// Component imports
import Nav from './components/Nav/Nav'

//import USERDATA from './USERDATA'


//const users_data = USERDATA()


// const coursesReducer = (state, action) => {
//   switch(action.type) {
//     case 'SET_COURSES':
//       return action.payload;
//     default:
//       throw new Error();
//   }
// };

const App = () => {
  
  return (
    // <div className="mainbar">
    // <hr />
    // <div>
    //   <nav id='sidebar'>
    //     <div class="sidebar-header">
    //       <h3>Sidebar</h3>
    //     </div>
    //       <Search value={searchText} onSearch={handleSearch} />
    //       <Sidebar users_data={filterUsers} />
    //   </nav>
    //   {/* <Router>
    //     <Navbar />
    //     <Switch>
    //       <Route path= '/' />
    //     </Switch>
    //   </Router> */}
    // </div>
    // </div>
    <Router>
    {/* Navigation*/}
    <Nav />
    <Switch>
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/profile' exact component={Profile} />
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

