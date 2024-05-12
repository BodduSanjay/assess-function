import QuestionContext from '../../context/QuestionContext'
import OptionItemDefault from '../OptionItemDefault'
import ImageOptionItem from '../ImageOptionItem'

const OptionType = ({optionsType, options, questionId}) => (
  <QuestionContext.Consumer>
    {value => {
      const {
        togleScore,
        answeredQuestionsList,
        selectedOptionsList,
        addSelectedOpt,
        addAnsQuestion,
      } = value

      const setId = (id, isCorrect, isSelected, optQuestionId) => {
        const isPresent = answeredQuestionsList.some(
          each => each.id === optQuestionId,
        )
        if (isCorrect) {
          togleScore()
        }
        if (!isPresent) {
          addAnsQuestion(optQuestionId)
        }
        if (!isSelected) {
          addSelectedOpt(id, optQuestionId)
        }
      }

      const renderDefault = () => (
        <ul className="ans-options-cont">
          {options.map(each => (
            <OptionItemDefault
              key={each.id}
              each={each}
              setId={setId}
              questionId={questionId}
              selectedOptionsList={selectedOptionsList}
            />
          ))}
        </ul>
      )

      const renderImage = () => (
        <ul className="ans-options-cont">
          {options.map(each => (
            <ImageOptionItem
              key={each.id}
              each={each}
              setId={setId}
              questionId={questionId}
              selectedOptionsList={selectedOptionsList}
            />
          ))}
        </ul>
      )

      const renderSingleSelect = () => {
        let initialId = options[0].id

        const isSelected = selectedOptionsList.some(
          opt => opt.selected === initialId,
        )

        const optionSelected = event => {
          const values = event.target.value
          const {id, isCorrect} = values
          setId(id, isCorrect, isSelected, questionId)
          initialId = id
        }

        return (
          <div className="select-option-cont">
            <select
              value={initialId}
              onChange={optionSelected}
              className="select-cont"
            >
              {options.map(each => {
                const updatedData = {
                  id: each.id,
                  text: each.text,
                  isCorrect: each.is_correct,
                }
                const {id, text, isCorrect} = updatedData
                return (
                  <option
                    className={isSelected ? 'option-styled' : 'normal-option'}
                    value={{id, isCorrect}}
                    key={id}
                  >
                    {text}
                  </option>
                )
              })}
            </select>
          </div>
        )
      }

      const renderOptions = () => {
        switch (optionsType) {
          case 'DEFAULT':
            return renderDefault()
          case 'IMAGE':
            return renderImage()
          case 'SINGLE_SELECT':
            return renderSingleSelect()
          default:
            return null
        }
      }
      return <>{renderOptions()}</>
    }}
  </QuestionContext.Consumer>
)

export default OptionType
