import React, { useRef } from "react";
import Button from "./Button";

interface PostCommentProps {
  onPost: (content: string) => void;
}

const PostComment: React.FC<PostCommentProps> = (props) => {
  const postRef = useRef<HTMLTextAreaElement>(null);

  const handlePost = () => {
    const message = postRef.current?.value;
    if (!message) return;
    props.onPost(message);
    postRef.current.value = "";
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-gray-50 shadow-lg dark:bg-gray-700 dark:border-gray-600">
      <div className="px-4 py-2 bg-light-300 rounded-t-lg dark:bg-gray-800">
        <label htmlFor="comment" className="sr-only">
          What are your thoughts?
        </label>
        <textarea
          ref={postRef}
          rows={3}
          className="resize-none w-full px-0 text-sm outline-0 text-gray-900 bg-light-300 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="What are your thoughts?"
        ></textarea>
      </div>
      <div className="px-3 py-2 border-t bg-light-400 dark:bg-gray-600 dark:border-gray-600">
        <Button varient="primary" onClick={handlePost}>
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default PostComment;
