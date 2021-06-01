// const CoursesList = ({courses}) => {
//     return courses.map(course => {
//         return <div key={course.banana}>
//           {course.name}
//           </div>
//       })
// }

const Sidebar = ({modules}) => {
    return modules.map(module => {
        return <div key={module.module_name}>
          <a href = {module.hyperlink}>{module.module_name}</a>
          </div>
      })
}

export default Sidebar