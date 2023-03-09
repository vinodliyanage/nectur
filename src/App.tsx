import Comment from "./components/Comment";
import Navbar from "./components/Navbar";
import PostComment from "./components/PostComment";
import { useComments } from "./hooks/useComments";
import { useURLHash } from "./hooks/useURLHash";
import "./index.css";
import { UserComment } from "./types/types";

function App() {
  const [comments, setComments] = useComments();
  const hash = useURLHash();
  const siteComments = comments?.[hash] || [];

  const handlePostComment = (content: string) => {
    if (!hash.length) return;

    const comment: UserComment = {
      belongTo: "admin",
      content,
      createdAt: Date.now(),
      id: Date.now(),
      likes: 0,
      dislikes: 0,
    };

    const _comments = { ...comments };

    if (hash in _comments) _comments[hash].unshift(comment);
    else _comments[hash] = [comment];

    setComments(_comments);
  };

  return (
    <div className="App p-2.5 dark:bg-gray-900">
      <Navbar />
      <div className="max-h-[300px] mb-2 overflow-y-scroll">
        {siteComments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
      <PostComment onPost={handlePostComment} />
    </div>
  );
}

export default App;
