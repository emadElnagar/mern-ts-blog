import { Key } from "react";
import { FiClock } from "react-icons/fi";
import { generateExcerpt } from "../utils/generateExcerpt";
import { calculateReadTime } from "../utils/calculateReadTime";
import { IoChatbubbleOutline } from "react-icons/io5";

type itemProps = {
  _id: Key;
  title: string;
  content: string;
  category: string | null;
  image: string;
  author: string;
  authorImage: string;
  commentsCount: number;
  date: string;
};

const Card = (item: itemProps) => {
  return (
    <article className="post-card">
      {/* Image */}
      <div className="post-image">
        <img src={`http://localhost:5000/${item.image}`} alt={item.title} />
        <span className="post-category">{item.category}</span>
      </div>

      {/* Content */}
      <div className="post-content">
        <h3 className="post-title">{item.title}</h3>
        <p className="post-excerpt">{generateExcerpt(item.content)}</p>
      </div>

      {/* Footer */}
      <div className="post-footer">
        <div className="post-author">
          <img
            src={`http://localhost:5000/${item.authorImage}`}
            alt={item.author}
            className="author-avatar"
          />
          <div>
            <span className="author-name">{item.author}</span>
            <small className="post-date">{item.date}</small>
          </div>
        </div>
        <div className="post-meta">
          <span>
            <FiClock /> {calculateReadTime(item.content)}
          </span>
          <span>
            <IoChatbubbleOutline /> {item.commentsCount} comments
          </span>
        </div>
      </div>
    </article>
  );
};

export default Card;
