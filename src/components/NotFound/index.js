import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/dnm4q4bgp/image/upload/v1715248324/Group_7504_2_sobsc3.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
