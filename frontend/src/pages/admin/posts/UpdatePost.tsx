import { Fragment, Key, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdCloudUpload } from "react-icons/md";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetSinglePost, UpdatePost } from "../../../features/PostFeatures";

const UpdatePostPage = () => {
  const { categories } = useSelector((state: any) => state.category);
  const { slug } = useParams();
  const { post } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GetSinglePost(slug));
  }, [dispatch, slug]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const handleImage = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setImage(target.files[0]);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (typeof image === "undefined") return;
    const formData = new FormData();
    formData.append("_id", post._id);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    dispatch(UpdatePost(formData)).then(() => navigate("/admin/posts"));
  };
  return (
    <Fragment>
      <Helmet>
        <title>Magagla-post-update</title>
      </Helmet>
      {post && (
        <div className="container">
          <h1 className="text-center heading">update post</h1>
          <form className="colum-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="title"
              defaultValue={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ReactQuill
              theme="snow"
              defaultValue={post.content}
              onChange={setContent}
            />
            <select onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category: { _id: Key; title: string }) => (
                <option key={category._id} value={`${category._id}`}>
                  {category.title}
                </option>
              ))}
            </select>
            <div className="img-preview">
              <img
                src={`${
                  image
                    ? URL.createObjectURL(image)
                    : post.image && `http://localhost:5000/${post.image}`
                }`}
                alt="user avatar"
              />
            </div>
            <input
              type="file"
              id="image-upload"
              accept="*/images"
              onChange={handleImage}
            />
            <label htmlFor="image-upload" className="upload-label">
              <MdCloudUpload /> upload image
            </label>
            <input type="submit" value="Post" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UpdatePostPage;
