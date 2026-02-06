import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetMe, UserRegister } from "../../features/UserFeatures";
import { Fragment, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import { Helmet } from "react-helmet";
import type { AppDispatch } from "../../store";

const RegisterPage = () => {
  const search = useLocation().search;
  const next = new URLSearchParams(search).get("next");
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNaN(Number(firstName)) || !isNaN(Number(lastName))) {
      ErrorAlert("Oops", `name can't be number`);
    } else if (password.length < 8) {
      ErrorAlert("Oops", "password must be at least 8 characters");
    } else if (password !== passwordConfirm) {
      ErrorAlert("Oops", `password and confirm password doesn't match`);
    } else {
      const result = await dispatch(
        UserRegister({ firstName, lastName, email, password }),
      );
      if (UserRegister.fulfilled.match(result)) {
        dispatch(GetMe());
      }
    }
  };
  if (user) {
    next ? navigate(`${next}`) : navigate("/");
  }
  return (
    <Fragment>
      <Helmet>
        <title>Magala-register</title>
      </Helmet>
      <div className="container">
        <form className="colum-form" method="POST" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="re enter password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <input type="submit" value="register" />
        </form>
        <p className="text-center">
          have an account? <Link to="/users/login">login</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
