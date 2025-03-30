// Comment.jsx
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "./Comment.scss";

// Import avatar images
import icon3 from "../../assets/images/icon3.jpeg";
import icon6 from "../../assets/images/icon6.jpeg";
import icon7 from "../../assets/images/icon7.jpeg";
import icon8 from "../../assets/images/icon8.jpeg";
import icon9 from "../../assets/images/icon9.jpeg";
import icon11 from "../../assets/images/icon11.jpeg";
import icon14 from "../../assets/images/icon14.png";
import icon15 from "../../assets/images/icon15.jpeg";
import icon16 from "../../assets/images/icon16.jpeg";
import placeholder from "../../assets/images/image_placeholder.jpeg";

// Map avatars by filename string
const avatarMap = {
  "icon3.jpeg": icon3,
  "icon6.jpeg": icon6,
  "icon7.jpeg": icon7,
  "icon8.jpeg": icon8,
  "icon9.jpeg": icon9,
  "icon11.jpeg": icon11,
  "icon14.png": icon14,
  "icon15.jpeg": icon15,
  "icon16.jpeg": icon16,
};

const Comment = ({ comment }) => {
  const [reactions, setReactions] = useState({
    "👍": 0,
    "👎": 0,
  });

  const timeStampToDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date =
      timestamp.toString().length === 10
        ? new Date(timestamp * 1000)
        : new Date(timestamp);
    return isNaN(date.getTime())
      ? "Invalid date"
      : formatDistanceToNow(date, { addSuffix: true });
  };

  const handleReaction = (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
  };

  const avatarSrc = avatarMap[comment.avatar] || placeholder;

  return (
    <motion.div
      className="comment"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="comment__left-col">
        <div className="comment__avatar-wrapper">
          <img
            src={avatarSrc}
            alt="User avatar"
            className="comment__user-img"
          />
          <div className="comment__tooltip">
            {comment.name} • {timeStampToDate(comment.timestamp)}
          </div>
        </div>
      </div>

      <div className="comment__right-col">
        <div className="comment__row">
          <h4 className="comment__user-name">{comment.name}</h4>
          <p className="comment__date">{timeStampToDate(comment.timestamp)}</p>
        </div>

        <div className="comment__row">
          <p className="comment__text">{comment.comment}</p>
        </div>

        <div className="comment__reactions">
          <button onClick={() => handleReaction("👍")}> 
            <ThumbsUp size={18} strokeWidth={2} />
            <span>{reactions["👍"]}</span>
          </button>
          <button onClick={() => handleReaction("👎")}>
            <ThumbsDown size={18} strokeWidth={2} />
            <span>{reactions["👎"]}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Comment;
