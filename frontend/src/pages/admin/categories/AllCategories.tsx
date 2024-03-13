import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


const AllCategories = () => {
  return (
    <div className="container">
      <h1 className="heading text-center">all categories</h1>
      <ul>
        <li className="row">
          <span>cars</span>
          <div className="control">
            <button><MdDelete /> delete</button>
            <button><IoPencil /> update</button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default AllCategories;
