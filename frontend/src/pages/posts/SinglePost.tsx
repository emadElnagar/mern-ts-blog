import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetSimilarPosts, GetSinglePost } from "../../features/PostFeatures";
import LoadingScreen from "../../components/LoadingScreen";
import { IoIosSend } from "react-icons/io";
import moment from "moment";
import Card from "../../components/Card";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    dispatch(GetSinglePost(slug));
  }, [dispatch, slug]);
  useEffect(() => {
    dispatch(GetSimilarPosts(slug));
  }, [dispatch, slug]);
  const { post, similarPosts, isLoading } = useSelector((state: any) => state.post);
  const { user } = useSelector((state: any) => state.user);
  return (
    <Fragment>
      <Helmet>
        {
          post ?
          <title>Megala-{ post.slug }</title> :
          <title>Megala</title>
        }
      </Helmet>
      {
        isLoading ? <LoadingScreen /> : 
        post && 
        <div className="container">
          <div className="single-post">
            <h1>{ post.title }</h1>
            <div className="post-img-container">
              <img src={`http://localhost:5000/${ post.image }`} alt="It's problem showing images" />
              <span className="date">Created at { moment(post.createdAt).format('MMMM Do YYYY') }</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
          <div className="comments">
            {
              user ? (
                <form>
                  <input type="text" placeholder="Leave a comment" />
                  <button type="submit"><IoIosSend /></button>
                </form>
              ) : (
                <>
                  <Link to={`/users/login?next=/posts/${ post.slug }`}>
                    <input className="comment-input" type="text" placeholder="login to leave a comment" />
                  </Link>
                </>
              )
            }
            <div className="comment">
              <div className="user">
                <img src={`${process.env.PUBLIC_URL + '/images/user-avatar.png'}`} alt="avatar" />
                <span className="name">John Doe</span> <span className="date">13 hours ago</span>
              </div>
              <div><p>This is a great article</p></div>
            </div>
          </div>
          {
            similarPosts.length > 0 &&
            <div className="similar-posts">
              <h2 className="text-center">You may also like</h2>
              <div className="posts-container">
                {similarPosts.map((post: any) => (
                  <Link to={`/posts/${post.slug}`}>
                    <Card
                      key={ post._id }
                      _id={ post._id }
                      title={ post.title }
                      category={ null }
                      image={ post.image } />
                  </Link>
                ))}
              </div>
            </div>
          }
        </div>
      }
    </Fragment>
  )
}

export default SinglePost;
