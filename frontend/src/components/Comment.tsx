import moment from "moment";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { LuReply } from "react-icons/lu";
import { BiSolidSend } from "react-icons/bi";
import { User } from "../types/user";
import { Comment } from "../types/comment";
import { BASE_URL } from "../Api";

interface Props {
  comment: Comment;
  user: User | null;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  onLike: (e: { preventDefault: () => void }, id: string) => void;
  onReply: (
    e: { target: any; preventDefault: () => void },
    parentId: string,
    text: string,
  ) => void;
}

const CommentItem = ({
  comment,
  user,
  onDelete,
  onUpdate,
  onLike,
  onReply,
}: Props) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const isOwner = user?._id === comment.author._id;
  const isAdmin = user?.role === "admin";
  const isLiked = !!user && comment.likes.includes(user._id);
  const replies = comment.replies ?? [];

  const submitReply = (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(e, replyText, comment._id);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="comment">
      {/* USER */}
      <div className="user">
        <img
          src={
            comment.author.image
              ? `${BASE_URL}/${comment.author.image}`
              : "/images/user-avatar.png"
          }
          alt="avatar"
        />

        <div className="info">
          <span className="name">
            {comment.author.firstName} {comment.author.lastName}
          </span>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      </div>

      {/* CONTENT */}
      <p className="content">{comment.content}</p>

      {/* ACTIONS */}
      <div className="comment-actions">
        <button
          title="Like"
          className={`like-btn sm-btn ${isLiked ? "active" : ""}`}
          onClick={(e) => onLike(e, comment._id)}
        >
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}{" "}
          <span>{comment.likes.length}</span>
        </button>

        <button title="Reply" onClick={() => setShowReply(!showReply)}>
          <LuReply />{" "}
          {replies.length === 1 ? (
            <span className="replies-count">1 reply</span>
          ) : replies.length > 1 ? (
            <span className="replies-count">{replies.length} replies</span>
          ) : null}
        </button>
      </div>

      {/* CONTROLS */}
      {(isOwner || isAdmin) && (
        <div className="comment-control">
          <MdDelete onClick={() => onDelete(comment._id)} />
          {isOwner && <IoPencil onClick={() => onUpdate(comment._id)} />}
        </div>
      )}

      {/* REPLY INPUT */}
      {showReply && user && (
        <div className="reply-box">
          <input
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={submitReply}>
            <BiSolidSend />
          </button>
        </div>
      )}

      {/* RECURSIVE REPLIES */}
      {showReply && replies?.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              user={user}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onLike={onLike}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
