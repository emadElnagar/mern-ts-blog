import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { Fragment, useState } from "react";
import { Logout } from "../features/UserFeatures";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const handleDropDown = () => {
    setIsOpened(false);
    if (isActive === false) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  const handleOpen = () => {
    setIsActive(false);
    if (isOpened === true) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  }
  const handleLogout = () => {
    dispatch(Logout());
    setIsActive(false);
    navigate('/');
  }
  const handleNewPost = () => {
    setIsOpened(false);
  }
  const handleNewCategory = () => {
    setIsOpened(false);
  }
  return (
    <nav>
      <div className="logo">
        <h1>
          <Link to='/'>magala</Link>
        </h1>
      </div>
      <div className="search-form">
        <form>
          <input type="text" placeholder="Search" />
          <button><IoIosSearch /></button>
        </form>
      </div>
      <div className="account">
        <div className="buttons">
          {
            user === null ? (
              <Fragment>
                <Link to="/users/login">Login</Link>
                <Link to="/users/register">Register</Link>
              </Fragment>
            ) : (
              <Fragment>
                {
                  user.role === 'admin' || user.role === 'moderator' ?
                  (
                    <div className="dropdown">
                      <button className="dropdown-button" onClick={handleOpen}>
                        <IoMdArrowDropdown className={`${isOpened === false ? '' : 'rotate'}`} /> new
                      </button>
                      <ul className={`${isOpened === false ? 'dropdown-content d-none' : 'dropdown-content'}`}>
                        <li className="dropdown-item">
                          <button className="dropdown-button" onClick={handleNewPost}>
                            <Link to="/posts/new">post</Link>
                          </button>
                        </li>
                        <li className="dropdown-item">
                        <button className="dropdown-button" onClick={handleNewCategory}>
                          <Link to="/categories/new">category</Link>
                        </button>
                        </li>
                      </ul>
                    </div>
                  )
                  : <></>
                }
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
              </Fragment>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
