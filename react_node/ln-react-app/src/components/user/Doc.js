import React, {useState} from 'react'
import Sidebar from './sidebar'
import Search from './Search'

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

var users_data = [
  {
    name:'Emma Cooper',
    role:'patient',
    email:'ecooper@fruit.com',
    uid:'lkj2343@3l2k3rs'
  },
  {
    name:'Oliver Miller',
    role:'patient',
    email:'omiller@fruit.com',
    uid:'l341lkjm,mdfmafdss'
  },
  {
    name:'Hamza Shaikh',
    role:'patient',
    email:'hshaikh@fruit.com',
    uid:'djfalfjkdlsflkm32lml'
  },
  {
    name:'Tiger Lee',
    role:'patient',
    email:'tiger@fruit.com',
    uid: 'sklfdsalk321e12'
  },

]



const App = () => {

  const [searchText, setSearchText] = useState('');

  const handleSearch = event => {
    //console.log(event.target.value);
    setSearchText(event.target.value);
  }

  // const filteredModules = modules.filter(module=> {
  //   return module.module_name.includes(searchText) || module.hyperlink.includes(searchText)
  // })

  const filterUsers = users_data.filter(user=> {
    return user.name.includes(searchText.toLowerCase()) || user.email.includes(searchText.toLowerCase())
  })

  return (
    <div className="mainbar">
    <div>
      <hr />
      <Search onSearch={handleSearch} />
      <Sidebar users_data={filterUsers} />
    </div>
    </div>
  );
}



export default App
