import { RequestHandler, Response } from "express";
import Category from "../models/Category";
import { AuthenticatedRequest } from "../types/authTypes";

// Create a new category
export const newCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const foundCategoryTitle = await Category.findOne({
      title: req.body.title,
    });
    if (foundCategoryTitle) {
      return res
        .status(401)
        .json({ message: "This title already exists, Try another name" });
    }
    interface categoryType {
      title: string;
      author: string;
    }
    const category = new Category<categoryType>({
      title: req.body.title,
      author: req.user._id,
    });
    await category.save();
    res.status(200).json({ message: "Category created successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
export const getAllCategories: RequestHandler = async (_req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update category
export const updateCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const newCategory = {
      title: req.body.title,
    };
    const foundCategory = await Category.findOne({
      title: req.body.title,
      _id: { $ne: req.params.id },
    });
    if (foundCategory) {
      return res
        .status(401)
        .json({ message: "This category already exists, Try another name" });
    }
    if (
      !req.body.title ||
      typeof req.body.title !== "string" ||
      !req.body.title.trim()
    ) {
      return res.status(400).json({ message: "Invalid category title" });
    }
    await Category.updateOne({ _id: req.params.id }, { $set: newCategory });
    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete category
export const deleteCategory = (req: AuthenticatedRequest, res: Response) => {
  try {
    const category = Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    Category.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
