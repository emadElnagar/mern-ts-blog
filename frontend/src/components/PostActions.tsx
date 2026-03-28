import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

interface Props {
  initialLikes: number;
  initialLiked: boolean;
  commentsCount: number;
  onLikePost: () => void;
}

const PostActions = ({
  initialLikes,
  initialLiked,
  commentsCount,
  onLikePost,
}: Props) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    onLikePost();
    setLiked(!liked);
  };

  return (
    <div className="post-actions">
      <button
        className={`like-btn ${liked ? "active" : ""}`}
        onClick={handleLike}
      >
        {liked ? <AiFillLike /> : <AiOutlineLike />}
        <span>{likes}</span>
      </button>

      <button className="comment-btn">
        <FaRegCommentDots />
        <span>{commentsCount} Comments</span>
      </button>
    </div>
  );
};

export default PostActions;
