import { Fragment, Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeUserRole,
  DeleteUser,
  GetAllUsers,
} from "../../../features/UserFeatures";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import type { AppDispatch } from "../../../store";

type UpdateUser = {
  role: string;
};

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);
  // Delete user
  const handleDelete = (id: Key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteUser(String(id)));
        dispatch(GetAllUsers());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  // Update user role
  let userRoleInput: HTMLInputElement;
  const handleUpdateRole = (id: Key, userRole: string) => {
    Swal.fire<UpdateUser>({
      title: "Update user",
      html: `
        <div class="select">
          <select name="role" id="role">
            <option value="user" ${
              userRole === "user" && "selected"
            }>user</option>
            <option value="moderator" ${
              userRole === "moderator" && "selected"
            }>moderator</option>
            <option value="admin" ${
              userRole === "admin" && "selected"
            }>admin</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        userRoleInput = popup.querySelector("#role") as HTMLInputElement;
        userRoleInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const role = userRoleInput.value;
        if (!role) {
          Swal.showValidationMessage(`Please Choose user role`);
        }
        return { role };
      },
    }).then((result) => {
      const role = result.value?.role;
      if (result.isConfirmed && role) {
        dispatch(
          ChangeUserRole({
            _id: String(id),
            newRole: role,
          }),
        );
      }
    });
  };
  return (
    <Fragment>
      <Helmet>
        <title>Magala-admin</title>
      </Helmet>
      <div className="container">
        <h1 className="heading text-center">users list</h1>
        {users &&
          users.length > 0 &&
          users.map(
            (user: {
              _id: Key;
              firstName: string;
              lastName: string;
              role: string;
            }) => (
              <ul key={user?._id}>
                <li className="row">
                  <div>
                    <span>
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <div>
                    <span>{user?.role}</span>
                  </div>
                  <div className="control">
                    <button
                      onClick={() => handleUpdateRole(user._id, user.role)}
                    >
                      <IoPencil /> update
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="delete"
                    >
                      <MdDelete /> delete
                    </button>
                  </div>
                </li>
              </ul>
            ),
          )}
      </div>
    </Fragment>
  );
};

export default UsersList;
