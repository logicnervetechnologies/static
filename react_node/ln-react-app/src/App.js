import React, {useState, useEffect} from 'react'
//import Sidebar from './components/user/sidebar'
import Search from './components/user/Search'
//import Navbar from './components/Navbar'
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Team from './pages/Team';
import USERDATA from './USERDATA'



const users_data = USERDATA()
// var modules = [
//   {
//     module_name: 'Banana form',
//     hyperlink: '/modules/banana'
    
//   },
//   {
//     module_name: 'Apple form',
//     hyperlink: '/modules/apple'
//   },
//   {
//     module_name: 'Avacado form',
//     hyperlink: '/modules/avacado'
//   },
//   {
//     module_name: 'Pear form',
//     hyperlink: '/modules/pear'
//   }
// ];


// var user_data = {
//   name:'banana man',
//   role:'patient',
//   email:'banana@fruit.com'
// }





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
    <Sidebar />
    <Switch>
      <Route path='/overview' exact component={Overview} />
      <Route path='/reports' exact component={Reports} />
      <Route path='/reports/reports1' exact component={ReportsOne} />
      <Route path='/reports/reports2' exact component={ReportsTwo} />
      <Route path='/reports/reports3' exact component={ReportsThree} />
      <Route path='/team' exact component={Team} />
    </Switch>
  </Router>
  );
}

export default App

