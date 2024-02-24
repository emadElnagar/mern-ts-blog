import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const handleDropDown = () => {
    if (isActive === false) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
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
                <li className="dropdown-item">logout</li>
              </ul>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default NavBar;
