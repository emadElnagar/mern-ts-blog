import { Key, useEffect } from "react";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCategory, GetAllCategories } from "../../../features/CategoryFeatures";
import Swal from "sweetalert2";


const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.category);
  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  // Handle delete
  const handleDelete = (id: Key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteCategory(id));
        dispatch(GetAllCategories());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  return (
    <div className="container">
      <h1 className="heading text-center">all categories</h1>
      {
        categories.map((category: { _id: Key, title: string }) => (
          <ul key={ category._id }>
            <li className="row">
              <span>{ category.title }</span>
              <div className="control">
                <button onClick={() => handleDelete(category._id)}><MdDelete /> delete</button>
                <button><IoPencil /> update</button>
              </div>
            </li>
          </ul>
        ))
      }
    </div>
  )
}

export default AllCategories;
