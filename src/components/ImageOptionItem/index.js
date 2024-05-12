import './index.css'

const ImageOptionItem = ({each, setId, questionId, selectedOptionsList}) => {
  const updatedData = {
    id: each.id,
    text: each.text,
    imageUrl: each.image_url,
    isCorrect: each.is_correct,
  }
  const {id, text, imageUrl, isCorrect} = updatedData

  const isSelected = selectedOptionsList.some(opt => opt.selected === id)

  const optionClicked = () => {
    setId(id, isCorrect, isSelected, questionId)
  }
  return (
    <li className="list-image-item-style" key={id}>
      <button
        type="button"
        className={isSelected ? 'active-image-style' : 'normal-image-style'}
        onClick={optionClicked}
      >
        <img className="image-style" src={imageUrl} alt={text} />
      </button>
    </li>
  )
}
export default ImageOptionItem
