import './index.css'
import {Link} from 'react-router-dom'

const CourseItem = props => {
  const {course} = props
  const {id, name, logoUrl} = course

  return (
    <Link to={`/courses/${id}`} className="linkelement">
      <li className="courselistItem">
        <img src={logoUrl} alt={name} className="course-logoimage" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}
export default CourseItem
