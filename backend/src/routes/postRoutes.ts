import { Router } from "express";
import { DeletePost, GetAllPosts, GetSimilarPosts, GetSinglePost, UpdatePost, newPost } from "../controllers/postControllers";
import upload from "../middlewares/Multer";

const postRouter = Router();

// Create a new post route
postRouter.post('/new', upload.single('image'), newPost);

// Get all posts
postRouter.get('/all', GetAllPosts);

// Get single post
postRouter.get('/:slug', GetSinglePost);

// Get similar posts
postRouter.get('/:slug/similar', GetSimilarPosts);

// Update post
postRouter.put('/:id/update', UpdatePost);

// Delete post
postRouter.delete('/:id/delete', DeletePost);

export default postRouter;
