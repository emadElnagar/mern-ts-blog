import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Logout } from "../features/UserFeatures";
import { IoIosMoon, IoIosSunny, IoMdLock, IoIosSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { changeTheme } from "../features/ThemeFeatures";
import { AppDispatch } from "../store";
import { BASE_URL } from "../Api";

const NavBar = () => {
  const url = BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.user);
  const { theme } = useSelector((state: any) => state.theme);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleLogout = () => {
    dispatch(Logout());
  };
  // Search articles
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // search
    e.preventDefault();
    navigate("/search/${query}");
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
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <form className="search-from" onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
          />
          <button className="search-btn">
            <IoIosSearch />
          </button>
        </form>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <button
          className="icon-btn"
          aria-label="Toggle theme"
          onClick={() =>
            dispatch(changeTheme(theme === "dark" ? "light" : "dark"))
          }
        >
          {theme === "dark" ? <IoIosSunny /> : <IoIosMoon />}
        </button>

        {user ? (
          <div
            className="dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={
                user && user.image
                  ? `${url}/${user.image}`
                  : "/images/user-avatar.png"
              }
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
                {user && user.role === "admin" && (
                  <Link to="/admin">
                    <li className="dropdown-item">
                      <button>Admin</button>
                      <small>
                        <IoMdLock />
                      </small>
                    </li>
                  </Link>
                )}
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
