import { Fragment, Key, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetSimilarPosts, GetSinglePost } from "../../features/PostFeatures";
import LoadingScreen from "../../components/LoadingScreen";
import moment from "moment";
import Card from "../../components/Card";
import {
  DeleteComment,
  GetComments,
  NewComment,
  UpdateComment,
} from "../../features/CommentFeature";
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import Swal from "sweetalert2";
import { AppDispatch } from "../../store";
import CommentItem from "../../components/Comment";
import { Comment } from "../../types/comment";
import PostActions from "../../components/PostActions";

type UpdateCommentType = {
  content: string;
};

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

  const { post, similarPosts, isLoading } = useSelector(
    (state: any) => state.post,
  );
  const { user } = useSelector((state: any) => state.user);

  // Get post comments
  useEffect(() => {
    if (!post) return;
    const id = post._id;
    dispatch(GetComments(id));
  }, [dispatch, post]);
  const { comments } = useSelector((state: any) => state.comment);

  // Create a new comment
  const handleNewComment = (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      NewComment({
        post: post._id,
        author: user._id,
        content,
      }),
    );
    e.target.reset();
    setContent("");
  };

  // Delete comment
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteComment(id));
        Swal.fire({
          title: "Deleted!",
          text: "Comment has been deleted.",
          icon: "success",
        });
      }
    });
    dispatch(GetComments(post._id));
  };

  // Update comment
  const handleUpdate = (id: string) => {
    let bodyInput: HTMLInputElement;

    Swal.fire<UpdateCommentType>({
      title: "Update comment",
      html: `
      <input type="text" id="content" class="swal2-input" placeholder="content">
    `,
      confirmButtonText: "Update",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        bodyInput = popup.querySelector("#content") as HTMLInputElement;
        bodyInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const content = bodyInput.value;
        if (!content) {
          Swal.showValidationMessage(`Please enter the new comment`);
        }
        return { content };
      },
    }).then((result) => {
      const content = result.value?.content;
      if (result.isConfirmed && content) {
        dispatch(UpdateComment({ _id: id, content }));
        dispatch(GetComments(post._id));
      }
    });
  };

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
              initialLiked={false}
              commentsCount={comments.length}
            />
            <div className="comments">
              {user ? (
                <form onSubmit={handleNewComment}>
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
                    onLike={function (id: string): void {
                      throw new Error("Function not implemented.");
                    }}
                    onReply={function (parentId: string, text: string): void {
                      throw new Error("Function not implemented.");
                    }}
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
