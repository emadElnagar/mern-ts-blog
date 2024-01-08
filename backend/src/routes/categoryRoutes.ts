import { Router } from "express";
import { getAllCategories, newCategory, updateCategory } from "../controllers/categoryController";

const categoryRouter = Router();

// New category
categoryRouter.post('/new', newCategory);

// Get all categories
categoryRouter.get('/all', getAllCategories);

// Update category
categoryRouter.put('/:id/update', updateCategory);

export default categoryRouter;
