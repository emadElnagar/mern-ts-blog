import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewPostPage = () => {
  const [value, setValue] = useState('');
  return (
    <div className="container">
      <h1 className="text-center text-capitalize heading">new post</h1>
      <form>
        <input type="text" placeholder="title" />
        <ReactQuill theme="snow" value={value} onChange={setValue} />;
        <input type="file" accept="*/images" />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default NewPostPage;
