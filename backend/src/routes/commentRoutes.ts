import { RequestHandler, Router } from "express";
import {
  DeleteComment,
  GetPostComments,
  UpdateComment,
  newComment,
} from "../controllers/commentController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { AuthenticatedRequest } from "../types/authTypes";

const commentRouter = Router();

// create a new comment
commentRouter.post(
  "/new",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => newComment(req as AuthenticatedRequest, res),
);

// Get post comments
commentRouter.get("/:id", GetPostComments);

// Update comment
commentRouter.patch("/:id", isAuth as RequestHandler, (req, res) =>
  UpdateComment(req as AuthenticatedRequest, res),
);

// Delete comment
commentRouter.delete("/:id", isAuth as RequestHandler, (req, res) =>
  DeleteComment(req as AuthenticatedRequest, res),
);

export default commentRouter;
