import { Router } from "express";
import { GetAllPosts, GetSinglePost, UpdatePost, newPost } from "../controllers/postControllers";

const postRouter = Router();

// Create a new post route
postRouter.post('/new', newPost);

// Get all posts
postRouter.get('/all', GetAllPosts);

// Get single post
postRouter.get('/slug', GetSinglePost);

// Update post
postRouter.put('/:id', UpdatePost);

export default postRouter;
