import { Fragment, Key, useEffect } from "react";
import { Helmet } from "react-helmet";
import { MdCloudUpload } from "react-icons/md";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSinglePost } from "../../../features/PostFeatures";

const UpdatePost = () => {
  const { categories } = useSelector((state: any) => state.category);
  const { slug } = useParams();
  const { post } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSinglePost(slug));
  }, [dispatch, slug]);
  return (
    <Fragment>
      <Helmet>
        <title>Magagla-post-update</title>
      </Helmet>
      <div className="container">
        <h1 className="text-center heading">update post</h1>
        <form className="colum-form">
          <input type="text" placeholder="title" />
          <ReactQuill theme="snow" />
          <select>
            {categories.map((category: { _id: Key; title: string }) => (
              <option key={category._id} value={`${category._id}`}>
                {category.title}
              </option>
            ))}
          </select>
          <input type="file" id="image-upload" accept="*/images" />
          <label htmlFor="image-upload" className="upload-label">
            <MdCloudUpload /> upload image
          </label>
          <input type="submit" value="Post" />
        </form>
      </div>
    </Fragment>
  );
};

export default UpdatePost;
