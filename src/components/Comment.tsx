import React, { useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentContext";
import { UserComment } from "../types/Comment";
import { classNames, findTimeCategory } from "../utils/utils";
import Avatar from "./Avatar";
import PostComment from "./PostComment";
import ReplyList from "./ReplyList";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import ChevronUpIcon from "./icons/ChevronUpIcon";
import MinusIcon from "./icons/MinusIcon";
import ReplyIcon from "./icons/ReplyIcon";

interface CommentProps {
  comment: UserComment;
}

const _voteStyles = {
  voted: "text-orange-400",
  notVoted: "text-gray-400",
};

const _commentContentStyles = {
  base: "text-gray-500 dark:text-gray-400",
  minimized: "truncate",
};

const Comment: React.FC<CommentProps> = (props) => {
  const { comment } = props;

  const { user } = useAuth();

  if (!user) return <></>;

  const { firstName, lastName, photo } = user;
  const { belongTo, createdAt, message, upvotes, downvotes } = comment;

  const { handlePostComment } = useComments();
  const [controls, setControls] = useState({
    upvote: false,
    downvote: false,
    replyBtnShow: false,
    minimizeComment: false,
    repliesShow: true,
  });

  const { repliesShow, replyBtnShow } = controls;

  const upvoteClasses = classNames(_voteStyles, [controls.upvote ? "voted" : "notVoted"]);
  const downvoteClasses = classNames(_voteStyles, [controls.downvote ? "voted" : "notVoted"]);
  const commentContentClasses = classNames(_commentContentStyles, [
    controls.minimizeComment ? "minimized" : "",
    "base",
  ]);

  const timeCategory = useMemo(() => findTimeCategory(createdAt), [createdAt]);
  const userInitials = firstName[0] + lastName[0];

  const handleUpvoteClick = () => {
    setControls((state) => ({ ...state, upvote: !state.upvote, downvote: false }));
  };

  const handleDownvoteClick = () => {
    setControls((state) => ({ ...state, downvote: !state.downvote, upvote: false }));
  };

  const handleMinimizeClick = () => {
    setControls((state) => ({ ...state, minimizeComment: !state.minimizeComment }));
  };

  const handleReplyBtnShow = () => {
    setControls((state) => ({ ...state, replyBtnShow: !state.replyBtnShow }));
  };

  const handleRepliesShow = () => {
    setControls((state) => ({ ...state, repliesShow: !state.repliesShow }));
  };

  const handlePostReply = (message: string) => {
    handlePostComment(message, comment);
    setControls((state) => ({ ...state, replyBtnShow: false, repliesShow: true }));
  };

  return (
    <div className="relative">
      <article className="p-6 text-base bg-transparent dark:bg-gray-900">
        <header className="flex justify-between">
          <div className="flex">
            <div className="mr-2">
              <Avatar size="xs" initials={userInitials} image={photo} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold capitalize text-gray-900 dark:text-white">
                {belongTo}
              </p>

              <div className="flex flex-row gap-2 items-center">
                <p className="font-bold text-sm text-gray-600 dark:text-gray-400">
                  {upvotes - downvotes} points
                </p>
                <span className="block w-1 h-1 rounded-full bg-gray-600 dark:bg-gray-400"></span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time>{timeCategory}</time>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <button className={upvoteClasses} onClick={handleUpvoteClick}>
              <ChevronUpIcon />
            </button>
            <button className={downvoteClasses} onClick={handleDownvoteClick}>
              <ChevronDownIcon />
            </button>
            <button className="text-gray-300" onClick={handleMinimizeClick}>
              <MinusIcon />
            </button>
          </div>
        </header>

        <main className="mt-4">
          <p className={commentContentClasses}>{message}</p>
        </main>

        <footer className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            onClick={handleReplyBtnShow}
          >
            <ReplyIcon />
            Reply
          </button>
        </footer>
        <div className="mt-2">{replyBtnShow && <PostComment onPost={handlePostReply} />}</div>
      </article>

      <div>
        {comment.replies.length > 0 && (
          <button
            className="absolute top-0 group left-0 w-[2px] h-[100%] p-2"
            aria-label="Hide Replies"
            onClick={handleRepliesShow}
          >
            <span className="block w-[2px] h-[100%] bg-light-600 group-hover:bg-light-800 dark:bg-gray-600 dark:group-hover:bg-gray-400"></span>
          </button>
        )}

        {repliesShow && <ReplyList replies={props.comment.replies} />}
      </div>
    </div>
  );
};

export default Comment;
