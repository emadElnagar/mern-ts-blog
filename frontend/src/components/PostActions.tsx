import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  onLikePost: () => void;
  postSlug: string;
}

const PostActions = ({
  likesCount,
  isLiked,
  commentsCount,
  onLikePost,
  postSlug,
}: Props) => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  return (
    <div className="post-actions">
      {user ? (
        <button
          className={`like-btn ${isLiked ? "active" : ""}`}
          onClick={onLikePost}
        >
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          <span>{likesCount}</span>
        </button>
      ) : (
        <button
          className="like-btn"
          onClick={() => navigate(`/users/login?next=/posts/${postSlug}`)}
        >
          <AiOutlineLike />
          <span>{likesCount}</span>
        </button>
      )}

      <button className="comment-btn">
        <FaRegCommentDots />
        <span>{commentsCount} Comments</span>
      </button>
    </div>
  );
};

export default PostActions;
