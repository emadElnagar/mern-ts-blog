import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../../../features/UserFeatures";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch])
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
                <button className="delete"><MdDelete /> delete</button>
              </div>
            </li>
          </ul>
        ))
      }
    </div>
  )
}

export default UsersList;
