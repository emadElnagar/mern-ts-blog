import { Key, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const NewPostPage = () => {
  const [value, setValue] = useState('');
  const { categories } = useSelector((state: any) => state.category);
  return (
    <div className="container">
      <h1 className="text-center text-capitalize heading">new post</h1>
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
    </div>
  )
}

export default NewPostPage;
