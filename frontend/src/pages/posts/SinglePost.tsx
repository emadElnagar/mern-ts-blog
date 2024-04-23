import { Fragment, Key, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetSimilarPosts, GetSinglePost } from "../../features/PostFeatures";
import LoadingScreen from "../../components/LoadingScreen";
import moment from "moment";
import Card from "../../components/Card";
import { GetComments, NewComment } from "../../features/CommentFeature";

const SinglePost = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [body, setBody] = useState('');
  // Get single post
  useEffect(() => {
    dispatch(GetSinglePost(slug));
  }, [dispatch, slug]);
  // Get similar posts
  useEffect(() => {
    dispatch(GetSimilarPosts(slug));
  }, [dispatch, slug]);
  const { post, similarPosts, isLoading } = useSelector((state: any) => state.post);
  const { user } = useSelector((state: any) => state.user);
  // Get post comments
  useEffect(() => {
    if (! post) return;
    const id = post._id;
    dispatch(GetComments(id));
  }, [dispatch, post]);
  const { comments } = useSelector((state: any) => state.comment);
  // Create a new comment
  const handleNewComment = (e: {
    target: any; preventDefault: () => void; 
  }) => {
    e.preventDefault();
    dispatch(NewComment({
      post: post._id,
      author: user._id,
      body,
    }));
    e.target.reset();
    setBody('');
  }
  return (
    <Fragment>
      <Helmet>
        {
          post ?
          <title>Magala-{ post.slug }</title> :
          <title>Magala</title>
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
                <form onSubmit={handleNewComment}>
                  <input type="text" placeholder="Leave a comment" onChange={(e) => setBody(e.target.value)} />
                  <button type="submit"></button>
                </form>
              ) : (
                <Link to={`/users/login?next=/posts/${ post.slug }`}>
                  <form>
                    <input className="comment-input" type="text" placeholder="login to leave a comment" />
                  </form>
                </Link>
              )
            }
            {
              comments.length > 0 &&
              comments.map(
                (comment: 
                  {
                    _id: Key; createdAt: Date; author: { image: string; firstName: string, lastName: string }; body: string 
                  }
                ) => (
                <div className="comment" key={ comment._id }>
                  <div className="user">
                    <img 
                      src={`${comment.author.image ? `http://localhost:5000/${ comment.author.image }` : process.env.PUBLIC_URL + '/images/user-avatar.png'}`} 
                      alt="avatar" 
                    />
                    <span className="name">{ comment.author.firstName } { comment.author.lastName }</span> <span className="date">{ moment(comment.createdAt).fromNow() }</span>
                  </div>
                  <div><p>{ comment.body }</p></div>
                  <div className="comment reply">
                    <div className="user">
                      <img src={`${process.env.PUBLIC_URL + '/images/user-avatar.png'}`} alt="avatar" />
                      <span className="name">John Doe</span> <span className="date">13 hours ago</span>
                    </div>
                    <div><p>This is a great article</p></div>
                  </div>
                </div>
              ))
            }
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
