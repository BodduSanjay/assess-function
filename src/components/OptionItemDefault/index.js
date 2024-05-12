import './index.css'

const OptionItemDefault = ({each, setId, questionId, selectedOptionsList}) => {
  const updatedData = {
    id: each.id,
    text: each.text,
    isCorrect: each.is_correct,
  }
  const {id, text, isCorrect} = updatedData

  const isSelected = selectedOptionsList.some(opt => opt.selected === id)

  const optionClicked = () => {
    setId(id, isCorrect, isSelected, questionId)
  }
  return (
    <li className="list-item-style" key={id}>
      <button
        type="button"
        className={isSelected ? 'active-style' : 'normal-style'}
        onClick={optionClicked}
      >
        <p className={isSelected ? 'active-para' : 'normal-para'}>{text}</p>
      </button>
    </li>
  )
}
export default OptionItemDefault
