import { useEffect, useState } from "react";
import { Comments } from "../types/types";

export function useComments(): [
  Comments,
  React.Dispatch<React.SetStateAction<Comments>>
] {
  const [comments, setComments] = useState<Comments>({});

  useEffect(() => {
    const get = async () => {
      const { comments } = await chrome.storage.local.get("comments");
      setComments(comments || {});
    };
    get();
  }, []);

  useEffect(() => {
    const updateComments = async () => {
      const { comments: _comments = {} } = await chrome.storage.local.get(
        "comments"
      );
      chrome.storage.local.set({ comments: { _comments, ...comments } });
    };
    updateComments();
  }, [comments]);

  return [comments, setComments];
}
