import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { MdCloudUpload } from "react-icons/md";
import ReactQuill from "react-quill";

const UpdatePost = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Magagla-post-update</title>
      </Helmet>
      <div className="container">
        <h1 className="heading">update post</h1>
        <form className="colum-form">
          <input type="text" placeholder="title" />
          <ReactQuill theme="snow" />
          <select>
            <option>category</option>
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
