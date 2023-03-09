import React, { useState } from "react";

interface PostCommentProps {
  onPost: (content: string) => void;
}

const PostComment: React.FC<PostCommentProps> = (props) => {
  const [content, setContent] = useState("");
  const { onPost } = props;

  const handlePost = () => {
    onPost(content);
    setContent("");
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContent(value);
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-gray-50 shadow-lg dark:bg-gray-700 dark:border-gray-600">
      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          rows={3}
          className="w-full px-0 text-sm outline-0 text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a comment..."
          onChange={handleContent}
          value={content}
        ></textarea>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <button
          disabled={!content.length}
          onClick={handlePost}
          type="submit"
          className={
            content.length
              ? "inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg shadow-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              : "inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg shadow-lg cursor-default opacity-50"
          }
        >
          Post comment
        </button>
        <div className="flex pl-0 space-x-1 sm:pl-2">
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Upload image</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
