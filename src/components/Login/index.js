import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setChecked] = useState(false)
  const [errorDetails, setErrorDetails] = useState({
    errorMsg: '',
    showErrorMsg: false,
  })

  const handleUserNameChange = event => {
    setUserName(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleCheck = () => {
    setChecked(prevVal => !prevVal)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: userName,
      password,
    }
    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', `${data.jwt_token}`, {
        expires: 30,
      })
      const {history} = props
      history.replace('/')
    } else {
      setErrorDetails({
        errorMsg: data.error_msg,
        showErrorMsg: true,
      })
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="bg-div">
      <form onSubmit={handleSubmit} className="login-form">
        <img
          src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715140385/tp4cqc1b1rxgcaqpzpt9.png"
          alt="login website logo"
          className="login-logo"
        />
        <div className="input-container">
          <label className="user-name-label" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="input-el"
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
        <div className="input-container-2">
          <label className="user-name-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type={isChecked ? 'text' : 'password'}
            className="input-el"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="checkbox-container">
          <input
            id="checkbox"
            type="checkbox"
            onChange={handleCheck}
            value={isChecked}
            className="checkbox-el"
          />
          <label className="show-password-label" htmlFor="checkbox">
            Show Password
          </label>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        {errorDetails.showErrorMsg && (
          <p className="error-message">{errorDetails.errorMsg}</p>
        )}
      </form>
    </div>
  )
}
export default Login
