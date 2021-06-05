// const CoursesList = ({courses}) => {
//     return courses.map(course => {
//         return <div key={course.banana}>
//           {course.name}
//           </div>
//       })
// }

const Sidebar = ({users_data}) => {
    return (
        <div class='wrapper'>  
        
        {users_data.map(user => {
        return <tr key={user.name}>
          <a href = {user.uid}>{user.name}</a>
          <button class='dropdown=btn'>dropdown
            <i class = "fa fa-caret-down"></i>
          </button>
          <div class="dropdown-container">
          {user.mods.map((mod)=> {
            return <a href={"/mods/" + mod.id}>{mod.name}</a>
          })}
          </div>
          <p></p>
          </tr>
        })}
        
      </div>
      )
}

export default Sidebar