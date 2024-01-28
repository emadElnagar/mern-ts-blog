import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="container">
      <form>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="submit" value="login" />
      </form>
      <p className="text-center">don't have an account? <Link to="/users/register">register</Link></p>
    </div>
  )
}

export default LoginPage;
