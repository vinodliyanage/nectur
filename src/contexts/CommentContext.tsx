import { createContext, useContext, useEffect, useState } from "react";
import { useURLHash } from "../hooks/useURLHash";
import CommentService from "../services/comments";
import { Comments, UserComment } from "../types/Comment";
import { useAuth } from "./AuthContext";

interface CommentContext {
  comments: UserComment[];
  handlePostComment: (message: string, parentCommnet?: UserComment | null) => void;
}

interface CommentProviderProps {
  children: React.ReactNode;
}

const Context = createContext<CommentContext | null>(null);

export function useComments() {
  return useContext(Context) as CommentContext;
}

export default function CommentProvider({ children }: CommentProviderProps) {
  const {user} = useAuth();
  const [comments, setComments] = useState<Comments>({});
  const hash = useURLHash();

  const pageComments = comments?.[hash] || [];

  useEffect(() => {
    fetchComments();

    async function fetchComments() {
      const comments = await CommentService.get();
      setComments(comments || {});
    }
  }, [hash]);

  const handlePostComment = (message: string, parentCommnet: UserComment | null = null) => {
    if (!hash.length) return;
    if(!user) return;

    const comment: UserComment = {
      id: Date.now(),
      createdAt: Date.now(),
      belongTo: user.firstName,
      message,
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };

    if (parentCommnet) parentCommnet.replies.unshift(comment);
    else {
      if (pageComments.length) pageComments.unshift(comment);
      else comments[hash] = [comment];
    }
    
    CommentService.set(comments);
    setComments({ ...comments });
  };

  return (
    <Context.Provider
      value={{
        comments: pageComments,
        handlePostComment,
      }}
    >
      {children}
    </Context.Provider>
  );
}
