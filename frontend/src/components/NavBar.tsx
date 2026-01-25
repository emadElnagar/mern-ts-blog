import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Logout } from "../features/UserFeatures";
import { IoIosMoon, IoMdSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = () => {
    dispatch(Logout());
  };
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);
  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <Link to="/">
          <img src="/images/logo.png" alt="Magala logo" className="logo" />
          <span className="brand">Magala</span>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search articles..."
          className="search-input"
        />
      </div>

      {/* Right */}
      <div className="navbar-right">
        <button className="icon-btn" aria-label="Toggle theme">
          <IoIosMoon />
        </button>

        {user ? (
          <div
            className="dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="https://placehold.co/40"
              alt="Profile"
              className="profile-avatar"
            />
            <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
              <ul className="dropdown-menu">
                <Link to={`/users/profile/${user._id}`}>
                  <li className="dropdown-item">
                    <button>Profile</button>
                    <small>
                      <FaUserAlt />
                    </small>
                  </li>
                </Link>
                <li className="dropdown-item" onClick={handleLogout}>
                  Logout
                  <small>
                    <LuLogOut />
                  </small>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Link to="/users/login" className="login-btn">
              Login
            </Link>
            <Link to="/users/register" className="register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
