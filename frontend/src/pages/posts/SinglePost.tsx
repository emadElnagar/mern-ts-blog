import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSinglePost } from "../../features/PostFeatures";
import LoadingScreen from "../../components/LoadingScreen";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    dispatch(GetSinglePost(slug));
  }, [dispatch, slug]);
  const { post, isLoading } = useSelector((state: any) => state.post);
  return (
    <Fragment>
      <Helmet>
        <title>Megala-{ post && post.slug }</title>
      </Helmet>
      {
        isLoading ? <LoadingScreen /> : 
        post && 
        <div className="container">
          <div className="single-post">
            <h1>{ post.title }</h1>
            <img src={`http://localhost:5000/${ post.image }`} alt="It's problem showing images" />
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
        </div>
      }
    </Fragment>
  )
}

export default SinglePost;
