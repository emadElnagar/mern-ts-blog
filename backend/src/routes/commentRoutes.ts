import { Router } from "express";
import { DeleteComment, GetPostComments, newComment } from "../controllers/commentController";

const commentRouter = Router();

// create a new comment
commentRouter.post('/new', newComment);

// Get post comments
commentRouter.get('/:id', GetPostComments);

// Delete comment
commentRouter.delete('/:id', DeleteComment);

export default commentRouter;
