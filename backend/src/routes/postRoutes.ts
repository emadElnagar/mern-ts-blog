import { Router } from "express";
import { newPost } from "../controllers/postControllers";

const postRouter = Router();

// Create a new post route
postRouter.post('/new', newPost);

export default postRouter;
