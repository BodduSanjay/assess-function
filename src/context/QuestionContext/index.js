import React from 'react'

const QuestionContext = React.createContext({
  answeredQuestionsList: [],
  selectedOptionsList: [],
  score: 0,
  timeTaken: 0,
  resetAll: () => {},
  togleScore: () => {},
  addTime: () => {},
  addAnsQuestion: () => {},
  addSelectedOpt: () => {},
})
export default QuestionContext
