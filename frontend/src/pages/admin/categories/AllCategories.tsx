import { Key, useEffect } from "react";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategories } from "../../../features/CategoryFeatures";


const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.category);
  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  return (
    <div className="container">
      <h1 className="heading text-center">all categories</h1>
        {
          categories.map((category: { _id: Key, title: string }) => (
            <ul key={ category._id }>
              <li className="row">
                <span>{ category.title }</span>
                <div className="control">
                  <button><MdDelete /> delete</button>
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
