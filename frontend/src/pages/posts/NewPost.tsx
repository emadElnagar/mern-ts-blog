import { Fragment } from "react";
import PostForm from "../../components/PostForm";
import { Helmet } from "react-helmet";

const NewPostPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Magala-new-post</title>
      </Helmet>
      <div className="container">
        <h1 className="text-center text-capitalize heading">new post</h1>
        <PostForm />      
      </div>
    </Fragment>
  )
}

export default NewPostPage;
