import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { Logout } from "../features/UserFeatures";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const handleDropDown = () => {
    if (isActive === false) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  const handleLogout = () => {
    dispatch(Logout());
    setIsActive(false);
    navigate('/');
  }
  return (
    <nav>
      <div className="logo">
        <h1>
          <Link to='/'>magala</Link>
        </h1>
      </div>
      <div className="form">
        <form>
          <input type="text" placeholder="Search" />
          <button><IoIosSearch /></button>
        </form>
      </div>
      <div className="account">
        {
          user === null ? (
            <Link to="/users/login">login</Link>
          ) : (
            <div className="dropdown">
              <button className="dropdown-button" onClick={handleDropDown}>
                <IoMdArrowDropdown className={`${isActive === false ? '' : 'rotate'}`} />
                { user.firstName }
              </button>
              <ul className={`${isActive === false ? 'dropdown-content d-none' : 'dropdown-content'}`}>
                <li className="dropdown-item">profile</li>
                <li className="dropdown-item">
                  <button className="dropdown-button" onClick={handleLogout}>logout</button>
                </li>
              </ul>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default NavBar;
