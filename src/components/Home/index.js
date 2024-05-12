import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-down-cont">
      <ol className="assessment-details-container">
        <h1 className="heading-instructions">Instructions</h1>
        <li className="details-para">
          <span className="details-span">Total Questions:</span> 10
        </li>
        <li className="details-para">
          <span className="details-span">Types of Questions:</span> MCQs
        </li>
        <li className="details-para">
          <span className="details-span">Duration:</span> 10 Mins
        </li>
        <li className="details-para">
          <span className="details-span">Marking Scheme:</span> Every Correct
          response, get 1 mark
        </li>
        <li className="details-para">
          All the progress will be lost, if you reload during the assessment
        </li>
        <Link to="/assessment">
          <button type="button" className="start-button">
            Start Assessment
          </button>
        </Link>
      </ol>
      <img
        className="assessment-image"
        src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715236483/ah2nqxr7wxwmefitbzmj.png"
        alt="assessment"
      />
    </div>
  </div>
)

export default Home
