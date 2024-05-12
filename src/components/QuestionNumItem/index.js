import QuestionContext from '../../context/QuestionContext'
import './index.css'

const QuestionNumItem = ({each, isActive, questionClicked}) => (
  <QuestionContext.Consumer>
    {value => {
      const {answeredQuestionsList} = value
      const {id, displayText, questionId} = each
      const isAnswered = answeredQuestionsList.some(
        ans => ans.id === questionId,
      )

      const handleQuestionClicked = () => {
        questionClicked(id)
      }

      const btnClass = () => {
        if (isActive) {
          return 'active-button'
        }
        if (isAnswered) {
          return 'answered-button'
        }
        return 'normal-button'
      }

      return (
        <li className="num-list-item">
          <button
            type="button"
            className={btnClass()}
            onClick={handleQuestionClicked}
          >
            {displayText}
          </button>
        </li>
      )
    }}
  </QuestionContext.Consumer>
)
export default QuestionNumItem
