import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosAlert} from 'react-icons/io'

import QuestionContext from '../../context/QuestionContext'
import OptionsType from '../OptionsType'
import Header from '../Header'
import QuestionNumItem from '../QuestionNumItem'
import './index.css'

const questionNumbersList = [
  {
    id: 0,
    displayText: 1,
    questionId: '4c08f8e2-d69a-4cfa-9245-b76bdf3588d1',
  },
  {
    id: 1,
    displayText: 2,
    questionId: '4b38d184-6c53-4fa8-9176-4bba17f6a639',
  },
  {
    id: 2,
    displayText: 3,
    questionId: '68c01ea3-0fb2-4c79-bffd-d3dd90ecbf2f',
  },
  {
    id: 3,
    displayText: 4,
    questionId: 'ed321e23-faa3-451f-a093-9ad826c2e186',
  },
  {
    id: 4,
    displayText: 5,
    questionId: 'b563e313-05b8-4ba6-a69b-6614bd339f70',
  },
  {
    id: 5,
    displayText: 6,
    questionId: 'f8f9ed4d-0161-4709-8639-e999321f1488',
  },
  {
    id: 6,
    displayText: 7,
    questionId: 'f3b5738d-c73e-40b6-8512-af33e1a9cd4d',
  },
  {
    id: 7,
    displayText: 8,
    questionId: '3c3cc60c-2d4c-4431-978a-fd2cea112f33',
  },
  {
    id: 8,
    displayText: 9,
    questionId: '02b2e3a5-c997-4fb4-a9b6-54d5636a7a59',
  },
  {
    id: 9,
    displayText: 10,
    questionId: '6eff9f7d-9d80-4e3d-9dbd-95d063554eba',
  },
]

const currentApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
const Assessment = props => {
  const [apiStatus, setApiDetails] = useState(currentApiStatus.initial)
  const [questionList, setQuestionsList] = useState([])
  const [questionNumber, setQuestinNumber] = useState(questionNumbersList[0].id)
  const [seconds, setSeconds] = useState(600)
  const [total, setTotalQs] = useState(0)

  const getResults = () => {
    const {history} = props
    history.replace('/results')
  }

  const getQuestions = async () => {
    setApiDetails(currentApiStatus.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/assess/questions'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.questions.map(question => ({
        id: question.id,
        optionsType: question.options_type,
        questionText: question.question_text,
        options: question.options,
      }))
      setTotalQs(data.total)
      setQuestionsList(formattedData)
      setApiDetails(currentApiStatus.success)
    } else {
      setApiDetails(currentApiStatus.failure)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(timer)
          getResults()
          return prevSeconds
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [getResults, setSeconds])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  const renderFailure = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715317832/f4easioy7gnasaywlcal.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-para">We are having some trouble</p>
      <button type="button" className="retry-button" onClick={getQuestions}>
        Retry
      </button>
    </div>
  )

  const renderSuccess = () => (
    <QuestionContext.Consumer>
      {value => {
        const {answeredQuestionsList, addTime} = value
        const questionActive = questionList[questionNumber]
        const {id, optionsType, questionText, options} = questionActive

        const handleNextQuestion = () => {
          setQuestinNumber(prevNum => prevNum + 1)
        }
        const houres = Math.floor(seconds / 3600)
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60

        const questionClicked = numId => {
          setQuestinNumber(numId)
        }

        const handleSubmit = () => {
          addTime(600 - seconds)
          getResults()
        }

        return (
          <>
            <div className="question-container">
              <p className="question-text">
                {questionNumber + 1}. {questionText}
              </p>
              <p className="border-para"> </p>
              <div className="options-button-cont">
                <OptionsType
                  key={options.id}
                  optionsType={optionsType}
                  options={options}
                  questionId={id}
                />
                <div className="next-btn-cont">
                  {optionsType === 'SINGLE_SELECT' && (
                    <div className="alert-container">
                      <IoIosAlert height={25} width={25} color="#D97706" />
                      <p className="alert-para">
                        First option is selected by default
                      </p>
                    </div>
                  )}
                  {questionNumber !== 9 && (
                    <button
                      className="next-question-button"
                      type="button"
                      onClick={handleNextQuestion}
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="assessment-timer-container">
              <div className="timer-container">
                <p className="time-Left">Time Left</p>
                <p className="timer-para">
                  {`${houres < 10 ? '0' : ''}${houres}:${
                    minutes < 10 ? '0' : ''
                  }${minutes}:${
                    remainingSeconds < 10 ? '0' : ''
                  }${remainingSeconds}`}
                </p>
              </div>
              <div className="assessment-details-container">
                <div className="ans-unAns-container">
                  <div className="row-container">
                    <p className="answered-para">
                      {answeredQuestionsList.length}
                    </p>
                    <p className="answered-text-para">Answered Questions</p>
                  </div>
                  <div className="row-container">
                    <p className="unanswered-para">
                      {total - answeredQuestionsList.length}
                    </p>
                    <p className="answered-text-para">Unanswered Questions</p>
                  </div>
                </div>
                <div className="submission-container">
                  <div className="question-nums-cont">
                    <p className="question-text">Questions ({total})</p>
                    <ul className="question-item-container">
                      {questionNumbersList.map(each => (
                        <QuestionNumItem
                          key={each.id}
                          each={each}
                          isActive={questionNumber === each.id}
                          questionClicked={questionClicked}
                        />
                      ))}
                    </ul>
                  </div>
                  <button
                    className="submit-button"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit Assessment
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </QuestionContext.Consumer>
  )

  const renderAll = () => {
    switch (apiStatus) {
      case currentApiStatus.inProgress:
        return renderLoader()
      case currentApiStatus.success:
        return renderSuccess()
      case currentApiStatus.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <div className="assessment-bg-container">
      <Header />
      <div className="assessment-down-container">{renderAll()}</div>
    </div>
  )
}
export default Assessment
