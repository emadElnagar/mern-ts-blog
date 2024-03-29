import { Fragment, Key, useEffect } from "react";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCategory, GetAllCategories, UpdateCategory } from "../../../features/CategoryFeatures";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


type categoryType = {
  title: string
}

let categoryTitle: HTMLInputElement

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
  // Handle update category
  const handleUpdate = (_id: Key) => {
    Swal.fire<categoryType>({
      title: 'Update category',
      html: `
        <input type="text" id="title" class="swal2-input" placeholder="Category title">
      `,
      confirmButtonText: 'Update',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!
        categoryTitle = popup.querySelector('#title') as HTMLInputElement
        categoryTitle.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const title = categoryTitle.value
        if (!title) {
          Swal.showValidationMessage(`Please enter category title`);
        }
        return { title }
      },
    }).then((result) => {
      const  title  = result.value?.title;
      if (result.isConfirmed) {
        dispatch(UpdateCategory({ _id, title }));
        dispatch(GetAllCategories());
      }
    });
  }
  return (
    <Fragment>
      <Helmet>
        <title>Magala-login</title>
      </Helmet>
      <div className="container">
        <h1 className="heading text-center">all categories</h1>
        {
          categories.map((category: { _id: Key, title: string }) => (
            <ul key={ category._id }>
              <li className="row">
                <span>{ category.title }</span>
                <div className="control">
                  <button onClick={() => handleUpdate(category._id)}><IoPencil /> update</button>
                  <button onClick={() => handleDelete(category._id)} className="delete"><MdDelete /> delete</button>
                </div>
              </li>
            </ul>
          ))
        }
      </div>
    </Fragment>
  )
}

export default AllCategories;
