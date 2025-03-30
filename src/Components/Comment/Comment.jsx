import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import "./Comment.scss";

const userImage =
  "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg";

const Comment = ({ comment }) => {
  const [reactions, setReactions] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleReaction = (emoji) => {
    const emojiKey = emoji.native || emoji;
    setReactions((prev) => ({
      ...prev,
      [emojiKey]: (prev[emojiKey] || 0) + 1,
    }));
  };

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
            src={userImage}
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
          {Object.entries(reactions).map(([emoji, count]) => (
            <button key={emoji} onClick={() => handleReaction(emoji)}>
              {emoji} {count}
            </button>
          ))}

          <div className="comment__emoji-wrapper">
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              ➕
            </button>

            {showEmojiPicker && (
              <div className="comment__emoji-picker">
                <Picker data={data} onEmojiSelect={handleReaction} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Comment;
