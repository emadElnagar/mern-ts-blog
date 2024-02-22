import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../features/UserFeatures";

const LoginPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(Login({ email, password }));
  }
  if (user) {
    navigate('/');
  }
  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="login" />
      </form>
      <p className="text-center">don't have an account? <Link to="/users/register">register</Link></p>
    </div>
  )
}

export default LoginPage;
