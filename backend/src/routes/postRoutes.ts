import { RequestHandler, Router } from "express";
import {
  DeletePost,
  GetAllPosts,
  GetSimilarPosts,
  GetSinglePost,
  SearchPost,
  UpdatePost,
  newPost,
  LikePost,
} from "../controllers/postControllers";
import upload from "../middlewares/Multer";
import { isAdmin, isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";

const postRouter = Router();

// Create a new post route
postRouter.post(
  "/",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  upload.single("image"),
  (req, res) => newPost(req as AuthenticatedRequest, res),
);

// Search posts
postRouter.get("/search", SearchPost);

// Get all posts
postRouter.get("/", GetAllPosts);

// Get single post
postRouter.get("/:slug", GetSinglePost);

// Get similar posts
postRouter.get("/:slug/similar", GetSimilarPosts);

// Update post
postRouter.put(
  "/:id",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => UpdatePost(req as AuthenticatedRequest, res),
);

// Like post
postRouter.patch("/:id/like", isAuth as RequestHandler, (req, res) =>
  LikePost(req as AuthenticatedRequest, res),
);

// Delete post
postRouter.delete(
  "/:id",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => DeletePost(req as AuthenticatedRequest, res),
);

export default postRouter;
