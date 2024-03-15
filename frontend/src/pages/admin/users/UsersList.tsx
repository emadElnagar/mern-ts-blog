import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, GetAllUsers } from "../../../features/UserFeatures";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);
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
        dispatch(DeleteUser(id));
        dispatch(GetAllUsers());
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
      <h1 className="heading text-center">users list</h1>
      {
        users.map((user: { _id: Key, firstName: string, lastName: string, role: string }) => (
          <ul key={ user._id }>
            <li className="row">
              <span>{ user.firstName } { user.lastName }</span>
              <span>{ user.role }</span>
              <div className="control">
                <button><IoPencil /> update</button>
                <button onClick={() => handleDelete(user._id)} className="delete"><MdDelete /> delete</button>
              </div>
            </li>
          </ul>
        ))
      }
    </div>
  )
}

export default UsersList;
