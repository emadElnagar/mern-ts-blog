import { Router } from "express";
import { GetAllPosts, GetSinglePost, newPost } from "../controllers/postControllers";

const postRouter = Router();

// Create a new post route
postRouter.post('/new', newPost);

// Get all post
postRouter.get('/all', GetAllPosts);

// Get single post
postRouter.get('/slug', GetSinglePost);

export default postRouter;
