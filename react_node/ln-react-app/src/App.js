import React from 'react'
import Sidebar from './components/sidebar'


var modules = [
  {
    module_name: 'Banana form',
    hyperlink: '/modules/banana'
    
  },
  {
    module_name: 'Apple form',
    hyperlink: '/modules/apple'
  },
  {
    module_name: 'Pear form',
    hyperlink: '/modules/pear'
  }
];


var user_data = {
  name:'banana man',
  role:'patient',
  email:'banana@fruit.com'
}



const App = () => {

  return (
    <div className="dashboard">
    <div className="mainbar">
      <h1>List of modules</h1>
    </div>
    <div className="Sidebar">
      <br />
      <br />
      <a href='/profile'>My Profile</a>
      <hr />
      <Sidebar modules={modules} />
    </div>
    </div>
  );
}



export default App
