import { Key, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const PostForm = () => {
  const [value, setValue] = useState('');
  const { categories } = useSelector((state: any) => state.category);
  return (
    <form className="colum-form">
        <input type="text" placeholder="title" />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <select>
          {
            categories.map((category: {
              category: any; _id: Key; title: string; 
            }) => (
              <option key={ category.category._id } value={`${ category.category.title }`}>
                { category.category.title }
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
