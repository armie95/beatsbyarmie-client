import React from "react";
import "./CommentsSection.scss";
import Comment from "../Comment/Comment";

const CommentsSection = ({ playlist }) => {
  console.log("playlist", playlist);

  return (
    <section className="comments-section">
      {playlist?.comments?.length > 0 &&
        playlist.comments.map((comment, index) => (
          <Comment
            key={`${comment.id}-${comment.timestamp}-${index}`}
            comment={comment}
          />
        ))}
    </section>
  );
};

export default CommentsSection;

