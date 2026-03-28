import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  GetSimilarPosts,
  GetSinglePost,
  LikePost,
} from "../../features/PostFeatures";
import LoadingScreen from "../../components/LoadingScreen";
import moment from "moment";
import Card from "../../components/Card";
import { GetComments } from "../../features/CommentFeature";
import { AppDispatch } from "../../store";
import CommentItem from "../../components/Comment";
import { Comment } from "../../types/comment";
import PostActions from "../../components/PostActions";
import { useComments } from "../../hooks/CommentHooks";

const SinglePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");

  // Get single post
  useEffect(() => {
    if (!slug) return;
    dispatch(GetSinglePost(slug));
  }, [dispatch, slug]);

  // Get similar posts
  useEffect(() => {
    if (!slug) return;
    dispatch(GetSimilarPosts(slug));
  }, [dispatch, slug]);

  // Like post
  const handlePostLike = (id: string) => {
    dispatch(LikePost(id));
  };

  const { post, similarPosts, isLoading } = useSelector(
    (state: any) => state.post,
  );
  const { user } = useSelector((state: any) => state.user);

  const { createComment, handleDelete, handleUpdate, createReply, handleLike } =
    useComments(post?._id);

  // Get post comments
  useEffect(() => {
    if (!post) return;
    const id = post._id;
    dispatch(GetComments(id));
  }, [dispatch, post]);
  const { comments } = useSelector((state: any) => state.comment);

  return (
    <Fragment>
      <Helmet>
        {post ? <title>Magala-{post.slug}</title> : <title>Magala</title>}
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        post && (
          <div className="container">
            <div className="single-post">
              <div className="post-img-container">
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="It's problem showing images"
                />
                <span className="author">
                  Author:{" "}
                  <Link to={`/users/profile/${post.author._id}`}>
                    {post.author.firstName} {post.author.lastName}
                  </Link>
                </span>
                <br />
                <span className="date">
                  Created at: {moment(post.createdAt).format("MMMM Do YYYY")}
                </span>
              </div>
              <h1 className="post-title">{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
            {/* Post actions (like, comment) */}
            <PostActions
              initialLikes={post.likes.length}
              initialLiked={post.likes.includes(user?._id)}
              commentsCount={comments.length}
              onLikePost={() => handlePostLike(post._id)}
            />
            <div className="comments">
              {user ? (
                <form
                  onSubmit={(e: { target: any; preventDefault: () => void }) =>
                    createComment(content, e)
                  }
                >
                  <input
                    type="text"
                    placeholder="Leave a comment"
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button type="submit"></button>
                </form>
              ) : (
                <Link to={`/users/login?next=/posts/${post.slug}`}>
                  <form>
                    <input
                      className="comment-input"
                      type="text"
                      placeholder="login to leave a comment"
                    />
                  </form>
                </Link>
              )}
              <section className="post-comments">
                <h3>Comments ({comments.length})</h3>

                {comments.map((comment: Comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    user={user}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onLike={handleLike}
                    onReply={createReply}
                  />
                ))}
              </section>
            </div>
            {similarPosts.length > 0 && (
              <div className="similar-posts">
                <h2 className="text-center">You may also like</h2>
                <div className="posts-container">
                  {similarPosts.map((post: any) => (
                    <Link to={`/posts/${post.slug}`}>
                      <Card
                        key={post._id}
                        _id={post._id}
                        title={post.title}
                        content={post.content}
                        category={post.category?.title}
                        image={post.image}
                        author={`${post.author?.firstName} ${post.author?.lastName}`}
                        authorImage={post.author?.image}
                        commentsCount={post.commentsCount}
                        date={new Date(post.createdAt).toLocaleDateString()}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      )}
    </Fragment>
  );
};

export default SinglePost;
