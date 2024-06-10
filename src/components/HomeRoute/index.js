import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'

const apiStatusConstent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {courseList: [], apiStatus: apiStatusConstent.initial}

  componentDidMount() {
    this.getCouresesData()
  }

  getCouresesData = async () => {
    this.setState({apiStatus: apiStatusConstent.inprogress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const formatedData = data.courses.map(course => ({
        id: course.id,
        name: course.name,
        logoUrl: course.logo_url,
      }))
      this.setState({
        courseList: formatedData,
        apiStatus: apiStatusConstent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstent.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loadingContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#00bfff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureText">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failureButton"
        onClick={this.getCouresesData}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderCoursesList = () => {
    const {courseList} = this.state
    return (
      <>
        <h1 className="courseHeading">Courses</h1>
        <ul className="coursesList">
          {courseList.map(course => (
            <CourseItem key={course.id} course={course} />
          ))}
        </ul>
      </>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstent.inprogress:
        return this.renderLoadingView()
      case apiStatusConstent.success:
        return this.renderCoursesList()
      case apiStatusConstent.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="mainbgcontainer">
        <Header />
        <div className="homebody-container">{this.renderApiStatusView()}</div>
      </div>
    )
  }
}
export default HomeRoute
