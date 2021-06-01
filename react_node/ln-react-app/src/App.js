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
    <div className="App">
      <h1>List of modules</h1>
      <hr />
      <Sidebar modules={modules} />
    </div>
  );
}



export default App
