import { Key, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategories } from '../features/CategoryFeatures';
import { NewPost } from '../features/PostFeatures';
import { useNavigate } from 'react-router-dom';
import { MdCloudUpload } from "react-icons/md";

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | undefined>();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const { categories } = useSelector((state: any) => state.category);
  const { user } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  const handleImage = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setImage(target.files[0]);
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (typeof image === 'undefined') return;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('author', user._id);
    dispatch(NewPost(formData)).then(() => {
      navigate('/');
    });
  }
  return (
    <form className="colum-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      {
        image && (
          <div className='img-preview'>
            <img src={URL.createObjectURL(image)} alt='Problem showing your iamge' />
          </div>
        )
      }
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <select onChange={(e) => setCategory(e.target.value)}>
        {
          categories.map((category: { _id: Key; title: string; }) => (
            <option key={ category._id } value={`${ category._id }`}>
              { category.title }
            </option>
          ))
        }
      </select>
      <input type="file" id="image-upload" accept="*/images" onChange={handleImage} />
      <label htmlFor="image-upload" className="upload-label"><MdCloudUpload /> upload image</label>
      <input type="submit" value="Post" />
    </form>
  )
}

export default PostForm;
