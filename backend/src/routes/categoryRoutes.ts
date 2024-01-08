import { Router } from "express";
import { newCategory } from "../controllers/categoryController";

const categoryRouter = Router();

// New category
categoryRouter.post('/new', newCategory);

export default categoryRouter;
