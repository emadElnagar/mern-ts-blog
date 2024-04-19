import { Router } from "express";
import { newComment } from "../controllers/commentController";

const commentRouter = Router();

// create a new comment
commentRouter.post('/new', newComment);

export default commentRouter;
