import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container text-center not-found">
      <h1>404</h1>
      <p>oops, page not found</p>
      <Link to='/'>Take me home</Link>
    </div>
  )
}

export default NotFoundPage;
