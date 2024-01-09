import { Router } from "express";
import { DeletePost, GetAllPosts, GetSinglePost, UpdatePost, newPost } from "../controllers/postControllers";

const postRouter = Router();

// Create a new post route
postRouter.post('/new', newPost);

// Get all posts
postRouter.get('/all', GetAllPosts);

// Get single post
postRouter.get('/:slug', GetSinglePost);

// Update post
postRouter.put('/:id/update', UpdatePost);

// Delete post
postRouter.delete('/:id/delete', DeletePost);

export default postRouter;
