import React from "react";
import Comment from "../components/Comment";
import CommentNavbar from "../components/CommentNavbar";
import PostComment from "../components/PostComment";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentContext";

const Comments: React.FC = () => {

  const { loggedIn, user } = useAuth();
  const { comments, handlePostComment } = useComments();

  if (!loggedIn) return <></>;
  if (!user) return <></>;

  const navbarProps = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    photo: user.photo,
  };

  return (
    <div className="p-2.5">
      <CommentNavbar user={navbarProps} />

      <div className="h-[380px] overflow-y-scroll">
        {comments.length ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center w-full justify-center">
            <p className="text-sm font-normal capitalize text-gray-900 dark:text-white">
              No comments yet.
            </p>
          </div>
        )}
      </div>

      <PostComment onPost={handlePostComment} />
    </div>
  );
};

export default Comments;
