import React, {useState, useEffect} from 'react'
import Sidebar from './components/user/sidebar'
import Search from './components/user/Search'
//import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
    uid:'lkj2343@3l2k3rs',
    mods:[
      {name:"Heartbeat Collection",id:"1231293r209"},
      {name:"Sugar Levels",id:"12312afdssf209"},
      {name:"Blood Pressure Tracker",id:"13DASF3r593"}
    ]
  },
  {
    name:'Oliver Miller',
    role:'patient',
    email:'omiller@fruit.com',
    uid:'l341lkjm,mdfmafdss',
    mods:[
      {name:"Blood Collection",id:"1231293r209"},
      {name:"Sugar Levels",id:"12312afdssf209"}
    ]
  },
  {
    name:'Hamza Shaikh',
    role:'patient',
    email:'hshaikh@fruit.com',
    uid:'djfalfjkdlsflkm32lml',
    mods:[
      {name:"Height Tracker",id:"12dsfafdsvv209"},
      {name:"Feedback Form",id:"123dfasfsadf09"},
      {name:"Blood Pressure Tracker",id:"1323DAScr593"}
    ]
  },
  {
    name:'Tiger Lee',
    role:'patient',
    email:'tiger@fruit.com',
    uid: 'sklfdsalk321e12',
    mods:[
      {name:"Height Tracker",id:"12dsfafdsvv209"},
      {name:"Feedback Form",id:"123dfasfsadf09"},
      {name:"Blood Pressure Tracker",id:"1323DAScr593"}
    ]
  },

]



// const coursesReducer = (state, action) => {
//   switch(action.type) {
//     case 'SET_COURSES':
//       return action.payload;
//     default:
//       throw new Error();
//   }
// };


const App = () => {
  

  const [searchText, setSearchText] = useState(
      localStorage.getItem('searchText') || ''
    )

  const handleSearch = event => {
    //console.log(event.target.value);
    setSearchText(event.target.value);
   }

  useEffect(()=> {
    localStorage.setItem('searchText', searchText);

  }, [searchText])
  // const filteredModules = modules.filter(module=> {
  //   return module.module_name.includes(searchText) || module.hyperlink.includes(searchText)
  // })

  const filterUsers = users_data.filter(user=> {
    return user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase())
  })

  return (
    <div className="mainbar">
    <hr />
    <div>
      <nav id='sidebar'>
        <div class="sidebar-header">
          <h3>Sidebar</h3>
        </div>
          <Search value={searchText} onSearch={handleSearch} />
          <Sidebar users_data={filterUsers} />
      </nav>
      {/* <Router>
        <Navbar />
        <Switch>
          <Route path= '/' />
        </Switch>
      </Router> */}
    </div>
    </div>
  );
}



export default App
