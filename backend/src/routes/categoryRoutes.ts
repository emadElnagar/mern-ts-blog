import { Router } from "express";
import { getAllCategories, newCategory } from "../controllers/categoryController";

const categoryRouter = Router();

// New category
categoryRouter.post('/new', newCategory);

// Get all posts
categoryRouter.get('/all', getAllCategories);

export default categoryRouter;
