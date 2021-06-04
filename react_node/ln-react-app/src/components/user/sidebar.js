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
          <p>Mods: </p>
          {user.mods.map((mod)=> {
            return <a href={"/mods/" + mod.id}>{mod.name}</a>
          })}
          <p></p>
          </tr>
        })}
        
      </div>
      )
}

export default Sidebar