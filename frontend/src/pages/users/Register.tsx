import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserRegister } from "../../features/UserFeatures";
import { useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";

const RegisterPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (! isNaN(Number(firstName)) || ! isNaN(Number(lastName))) {
      ErrorAlert('Oops', `name can't be number`);
    } else if (password.length < 8) {
      ErrorAlert('Oops', 'password must be at least 8 characters');
    } else if (password !== passwordConfirm) {
      ErrorAlert('Oops', `password and confirm password doesn't match`);
    } else {
      dispatch(UserRegister({ firstName, lastName, email, password }));
    }
  }
  if (user) {
    navigate('/');
  }
  return (
    <div className="container">
      <form className="colum-form" method="POST" onSubmit={ handleSubmit }>
        <input type="text" placeholder="first name" onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="re enter password" onChange={(e) => setPasswordConfirm(e.target.value)} />
        <input type="submit" value="register" />
      </form>
      <p className="text-center">have an account? <Link to="/users/login">login</Link></p>
    </div>
  )
}

export default RegisterPage;
