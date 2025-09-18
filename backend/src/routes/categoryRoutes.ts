import { Router } from "express";
import {
  deleteCategory,
  getAllCategories,
  newCategory,
  updateCategory,
} from "../controllers/categoryController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { RequestHandler } from "express-serve-static-core";
import { AuthenticatedRequest } from "../types/authTypes";

const categoryRouter = Router();

// New category
categoryRouter.post(
  "/",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => newCategory(req as AuthenticatedRequest, res)
);

// Get all categories
categoryRouter.get("/", getAllCategories);

// Update category
categoryRouter.put(
  "/:id",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => updateCategory(req as AuthenticatedRequest, res)
);

// Delete category
categoryRouter.delete(
  "/:id",
  isAuth as RequestHandler,
  isAdmin as RequestHandler,
  (req, res) => deleteCategory(req as AuthenticatedRequest, res)
);

export default categoryRouter;
