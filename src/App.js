import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import QuestionContext from './context/QuestionContext'
import Login from './components/Login'
import Home from './components/Home'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// write your code here
const App = () => {
  const [answeredQuestionsList, setAnsweredQuestionsList] = useState([])
  const [selectedOptionsList, setSelectedOptionsList] = useState([])
  const [score, setScore] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)

  const togleScore = () => {
    setScore(prevScore => prevScore + 1)
  }

  const addTime = seconds => {
    setTimeTaken(seconds)
  }

  const addAnsQuestion = id => {
    setAnsweredQuestionsList(prevList => [...prevList, id])
  }

  const addSelectedOpt = (id, questionId) => {
    setSelectedOptionsList(prevOptList =>
      prevOptList.map(each => {
        if (each.question === questionId) {
          return {...each, selected: id}
        }
        return {question: questionId, selected: id}
      }),
    )
  }

  const resetAll = () => {
    setAnsweredQuestionsList([])
    setScore(0)
    setTimeTaken(0)
    setSelectedOptionsList([])
  }

  return (
    <QuestionContext.Provider
      value={{
        answeredQuestionsList,
        score,
        selectedOptionsList,
        timeTaken,
        resetAll,
        togleScore,
        addTime,
        addAnsQuestion,
        addSelectedOpt,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/assessment" component={Assessment} />
        <ProtectedRoute exact path="/results" component={Results} />
        <Route component={NotFound} />
      </Switch>
    </QuestionContext.Provider>
  )
}

export default App
