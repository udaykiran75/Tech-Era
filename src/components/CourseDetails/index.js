import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

const apiStatusConstent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {courseDetail: [], apiStatus: apiStatusConstent.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstent.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const formatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetail: formatedData,
        apiStatus: apiStatusConstent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstent.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loadingContainer">
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
        onClick={this.getCourseDetails}
        className="failureButton"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderCourseDetails = () => {
    const {courseDetail} = this.state

    return (
      <div className="cardContainer">
        <img
          src={courseDetail.imageUrl}
          alt={courseDetail.name}
          className="cardImage"
        />
        <div className="cardDetailsContainer">
          <h1 className="courseName">{courseDetail.name}</h1>
          <p className="courseDiscription">{courseDetail.description}</p>
        </div>
      </div>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstent.inprogress:
        return this.renderLoadingView()
      case apiStatusConstent.success:
        return this.renderCourseDetails()
      case apiStatusConstent.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="courseDetailMaincontainer">
        <Header />
        <div className="bodyContainer">{this.renderApiStatusView()}</div>
      </div>
    )
  }
}
export default CourseDetails
