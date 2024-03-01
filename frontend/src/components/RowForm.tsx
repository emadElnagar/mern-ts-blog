import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NewCategory } from "../features/CategoryFeatures";

const RowForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [title, setTitle] = useState('');
  const handleSubmit = (e: {
    target: any; preventDefault: () => void; 
  }) => {
    e.preventDefault();
    dispatch(NewCategory({
      title,
      author: user._id
    }));
    e.target.reset();
    setTitle('');
  }
  return (
    <Fragment>
      <form className="row-form" onSubmit={ handleSubmit }>
        <input type="text" placeholder="category title" required onChange={(e) => setTitle(e.target.value)} />
        <button>+</button>
      </form>
    </Fragment>
  )
}

export default RowForm;
