import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Login } from "../../features/UserFeatures";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const search = useLocation().search;
  const next = new URLSearchParams(search).get('next');
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
    next ? navigate(`${next}`) : navigate('/')
  }
  return (
    <Fragment>
      <Helmet>
        <title>Magala-login</title>
      </Helmet>
      <div className="container">
        <form className="colum-form" onSubmit={handleLogin}>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="login" />
        </form>
        <p className="text-center">don't have an account? <Link to={`${next ? '/users/register?next=' + next : '/users/register'}`}>register</Link></p>
      </div>
    </Fragment>
  )
}

export default LoginPage;
