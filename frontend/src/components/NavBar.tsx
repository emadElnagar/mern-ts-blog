import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const NavBar = () => {
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
        <Link to="/users/login">login</Link>
      </div>
    </nav>
  )
}

export default NavBar;
