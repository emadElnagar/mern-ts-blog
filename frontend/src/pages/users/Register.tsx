import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="container">
      <form>
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="re enter password" />
        <input type="submit" value="register" />
      </form>
      <p className="text-center">have an account? <Link to="/users/login">login</Link></p>
    </div>
  )
}

export default RegisterPage;
