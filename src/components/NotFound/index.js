import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div className="notfoundcontainer">
    <Header />
    <div className="notfoundImageContainer">
      <img
        className="notfoundImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="notfoundHeading">Page Not Found</h1>
      <p className="notfoundText">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)
export default NotFound
