import { Router } from "express";
import { DeleteComment, GetPostComments, UpdateComment, newComment } from "../controllers/commentController";

const commentRouter = Router();

// create a new comment
commentRouter.post('/new', newComment);

// Get post comments
commentRouter.get('/:id', GetPostComments);

// Update comment
commentRouter.patch('/:id', UpdateComment);

// Delete comment
commentRouter.delete('/:id', DeleteComment);

export default commentRouter;
