// const CoursesList = ({courses}) => {
//     return courses.map(course => {
//         return <div key={course.banana}>
//           {course.name}
//           </div>
//       })
// }

const Sidebar = ({users_data}) => {
    return users_data.map(user => {
        return <div key={user.name}>
          <a href = {user.email}>{user.name}</a>
          </div>
      })
}

export default Sidebar