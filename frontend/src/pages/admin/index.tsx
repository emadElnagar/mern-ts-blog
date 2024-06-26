import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Magala-admin</title>
      </Helmet>
      <div className="container">
        <h1 className="heading text-center">MAGALA</h1>
        <ul>
          <li className="row">
            <span><Link to='/admin/users'>users</Link></span>
          </li>
          <li className="row">
            <span><Link to='/admin/categories'>categories</Link></span>
            <button><Link to='/admin/categories/new'><IoIosAdd /> Add</Link></button>
          </li>
          <li className="row">
            <span><Link to='/admin/posts'>posts</Link></span>
            <button><Link to='/admin/posts/new'><IoIosAdd /> Add</Link></button>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

export default Dashboard;
