import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NewCategory } from "../features/CategoryFeatures";

const RowForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [title, setTitle] = useState('');
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(NewCategory({
      _id: user._id,
      title,
    }))
  }
  return (
    <Fragment>
      <form className="row-form" onSubmit={ handleSubmit }>
        <input type="text" placeholder="category title" onChange={(e) => setTitle(e.target.value)} />
        <button>+</button>
      </form>
    </Fragment>
  )
}

export default RowForm;
