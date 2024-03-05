import { RequestHandler } from "express";
import Category from "../models/Category";

// Create a new category
export const newCategory: RequestHandler = async (req, res) => {
  const foundCategoryTitle = await Category.findOne({ title: req.body.title });
  if (foundCategoryTitle) {
    res.json({ message: 'This title already exists, Try another name' });
  }
  interface categoryType {
    title: string,
    author: object
  }
  const category = new Category<categoryType>({
    title: req.body.title,
    author: req.body.author
  });
  category.save().then(category => {
    res.status(200).json({
      category
    });
  }).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });
}

// Get all categories
export const getAllCategories: RequestHandler = async (_req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
}

// Update category
export const updateCategory: RequestHandler = async (req, res) => {
  const newCategory = {
    title: req.body.title,
  }
  Category.updateOne({ _id: req.params.id }, { $set: newCategory }).then(_result => {
    res.status(200).json({
      message: 'Category updated successfully'
    });
  }).catch(error => {
    res.status(401).json({
      message: "Error" + error.message
    });
  });
}

// Delete category
export const deleteCategory: RequestHandler = (req, res) => {
  Category.deleteOne({ _id: req.params.id }).then(_result => {
    res.status(200).json({
      message: "Category deleted successfully"
    });
  }).catch(error => {
    res.status(401).json({
      message: "Error" + error.message
    });
  });
};
