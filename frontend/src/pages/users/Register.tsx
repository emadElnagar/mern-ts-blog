import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserRegister } from "../../features/UserFeatures";
import { useState } from "react";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UserRegister({ firstName, lastName, email, password }));
  }
  return (
    <div className="container">
      <form method="POST" onSubmit={ handleSubmit }>
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
