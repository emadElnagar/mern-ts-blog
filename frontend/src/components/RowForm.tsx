import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { NewCategory } from "../features/CategoryFeatures";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";

const RowForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const handleSubmit = (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();
    (dispatch(NewCategory({ title } as { title: string }))
      .unwrap()
      .then(() => navigate("/categories")),
      e.target.reset());
    setTitle("");
  };
  return (
    <Fragment>
      <form className="row-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="category title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>+</button>
      </form>
    </Fragment>
  );
};

export default RowForm;
