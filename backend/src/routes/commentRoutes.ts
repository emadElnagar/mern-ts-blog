import { Router } from "express";
import { GetPostComments, newComment } from "../controllers/commentController";

const commentRouter = Router();

// create a new comment
commentRouter.post('/new', newComment);

// Get post comments
commentRouter.get('/:id', GetPostComments);

export default commentRouter;
