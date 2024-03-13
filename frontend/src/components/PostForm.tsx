import { Key, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategories } from '../features/CategoryFeatures';

const PostForm = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const { categories } = useSelector((state: any) => state.category);
  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  return (
    <form className="colum-form">
        <input type="text" placeholder="title" />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <select>
          {
            categories.map((category: { _id: Key; title: string; }) => (
              <option key={ category._id } value={`${ category.title }`}>
                { category.title }
              </option>
            ))
          }
        </select>
        <input type="file" accept="*/images" />
        <input type="submit" value="submit" />
      </form>
  )
}

export default PostForm;
