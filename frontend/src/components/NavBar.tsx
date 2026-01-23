import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logout } from "../features/UserFeatures";
import { IoIosMoon } from "react-icons/io";

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
  };
  const handleOpen = () => {
    setIsActive(false);
    if (isOpened === true) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  };
  const handleLogout = () => {
    dispatch(Logout());
    setIsActive(false);
    navigate("/");
  };
  const handleNewPost = () => {
    setIsOpened(false);
    navigate("/posts/new");
  };
  const handleNewCategory = () => {
    setIsOpened(false);
    navigate("/categories/new");
  };
  const openAdminPanel = () => {
    setIsActive(false);
    navigate("/admin");
  };
  const openProfile = () => {
    setIsActive(false);
    navigate(`/users/profile/${user._id}`);
  };
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

        <img
          src="https://placehold.co/40"
          alt="Profile"
          className="profile-avatar"
        />
      </div>
    </nav>
  );
};

export default NavBar;
