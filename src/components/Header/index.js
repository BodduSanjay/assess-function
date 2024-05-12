import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="header-logo"
          src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715140385/rn1pajtkmnhazaxd6lrx.png"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
