import React from "react";
import { UserComment } from "../types/Comment";
import Comment from "./Comment";

interface CommentListProps {
  replies: UserComment[];
}

const ReplyList: React.FC<CommentListProps> = (props) => {
  return (
    <>
      {props.replies.map((replys, index) => (
        <div key={index} className="ml-5">
          <Comment comment={replys} />
        </div>
      ))}
    </>
  );
};

export default ReplyList;
