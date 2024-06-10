import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <div className="headerContainer">
    <Link to="/" className="linkelement">
      <img
        className="logoImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </div>
)
export default Header
