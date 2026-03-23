import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { NewComment } from "../features/CommentFeature";

export const useComments = (postId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  // Create a new comment
  const createComment = (
    content: string,
    e: { target: any; preventDefault: () => void },
  ) => {
    e.preventDefault();
    dispatch(
      NewComment({
        post: postId,
        content,
      }),
    );
    e.target.reset();
  };

  return { createComment };
};
