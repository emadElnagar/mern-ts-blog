import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  initialLikes: number;
  initialLiked: boolean;
  commentsCount: number;
  onLikePost: () => void;
  postSlug: string;
}

const PostActions = ({
  initialLikes,
  initialLiked,
  commentsCount,
  onLikePost,
  postSlug,
}: Props) => {
  const { user } = useSelector((state: any) => state.user);

  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const navigate = useNavigate();

  const handleLike = async () => {
    let previousLiked = liked;

    setLiked((prevLiked) => {
      setLikes((prevLikes) => (prevLiked ? prevLikes - 1 : prevLikes + 1));
      return !prevLiked;
    });

    try {
      await onLikePost();
    } catch (error) {
      // rollback
      setLiked(previousLiked);
      setLikes((prev) => (previousLiked ? prev + 1 : prev - 1));
    }
  };

  return (
    <div className="post-actions">
      {/* Like Button */}
      {user ? (
        <button
          className={`like-btn ${liked ? "active" : ""}`}
          onClick={handleLike}
        >
          {liked ? <AiFillLike /> : <AiOutlineLike />}
          <span>{likes}</span>
        </button>
      ) : (
        <button
          className="like-btn"
          onClick={() => navigate(`/users/login?next=/posts/${postSlug}`)}
        >
          <AiOutlineLike />
          <span>{likes}</span>
        </button>
      )}

      {/* Comment Button */}
      <button className="comment-btn">
        <FaRegCommentDots />
        <span>{commentsCount} Comments</span>
      </button>
    </div>
  );
};

export default PostActions;
