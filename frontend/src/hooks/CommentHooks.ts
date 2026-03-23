import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  DeleteComment,
  GetComments,
  NewComment,
  UpdateComment,
} from "../features/CommentFeature";
import Swal from "sweetalert2";

type UpdateCommentType = {
  content: string;
};

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

  // Delete comment
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteComment(id));
        Swal.fire({
          title: "Deleted!",
          text: "Comment has been deleted.",
          icon: "success",
        });
      }
    });
    dispatch(GetComments(postId));
  };

  // Update comment
  const handleUpdate = (id: string) => {
    let bodyInput: HTMLInputElement;

    Swal.fire<UpdateCommentType>({
      title: "Update comment",
      html: `
        <input type="text" id="content" class="swal2-input" placeholder="content">
      `,
      confirmButtonText: "Update",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        bodyInput = popup.querySelector("#content") as HTMLInputElement;
        bodyInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const content = bodyInput.value;
        if (!content) {
          Swal.showValidationMessage(`Please enter the new comment`);
        }
        return { content };
      },
    }).then((result) => {
      const content = result.value?.content;
      if (result.isConfirmed && content) {
        dispatch(UpdateComment({ _id: id, content }));
        dispatch(GetComments(postId));
      }
    });
  };

  return { createComment, handleDelete, handleUpdate };
};
