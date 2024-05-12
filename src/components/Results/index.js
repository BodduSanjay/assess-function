import QuestionContext from '../../context/QuestionContext'
import Header from '../Header'
import './index.css'

const Results = props => (
  <div className="results-bg-container">
    <Header />
    <div className="results-down-container">
      <QuestionContext.Consumer>
        {value => {
          const {score, timeTaken, resetAll} = value

          const handleReattemptClick = () => {
            resetAll()
            const {history} = props
            history.replace('/assessment')
          }

          if (timeTaken > 0) {
            const houres = Math.floor(timeTaken / 3600)
            const minutes = Math.floor(timeTaken / 60)
            const remainingSeconds = Math.floor(timeTaken % 60)
            return (
              <div className="results-cart-cont">
                <img
                  className="submit-image"
                  src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715414422/hq0xrecueqzdivzknufp.png"
                  alt="submit"
                />
                <h1 className="submit-heading">
                  Congrats! You completed the assessment.
                </h1>
                <p className="submit-para">
                  Time Taken:{' '}
                  <span className="submit-timer-para">
                    {`${houres < 10 ? '0' : ''}${houres}:${
                      minutes < 10 ? '0' : ''
                    }${minutes}:${
                      remainingSeconds < 10 ? '0' : ''
                    }${remainingSeconds}`}
                  </span>
                </p>
                <p className="score-title">
                  Your Score: <span className="score-para">{score}</span>
                </p>
                <button
                  type="button"
                  className="reattempt-button"
                  onClick={handleReattemptClick}
                >
                  Reattempt
                </button>
              </div>
            )
          }
          return (
            <div className="results-cart-cont">
              <img
                className="submit-image"
                src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715414423/qsmspw61wywfuuvtl2pu.png"
                alt="time up"
              />
              <h1 className="submit-heading">Time is up</h1>
              <p className="submit-para">
                You did not complete the assessment within the time.
              </p>
              <p className="score-title">
                Your Score: <span className="score-para">{score}</span>
              </p>
              <button
                type="button"
                className="reattempt-button"
                onClick={handleReattemptClick}
              >
                Reattempt
              </button>
            </div>
          )
        }}
      </QuestionContext.Consumer>
    </div>
  </div>
)
export default Results
