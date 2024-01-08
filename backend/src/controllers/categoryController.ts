import { RequestHandler } from "express";
import Category from "../models/Category";

// Create a new category
export const newCategory: RequestHandler =async (req, res) => {
  const foundCategoryTitle = await Category.findOne({ title: req.body.title });
  if (foundCategoryTitle) {
    res.json({ message: 'This title already exists, Try another name' });
  }
  interface categoryType {
    title: string,
    author: object
  }
  const category = new Category<categoryType>({
    title: req.body.tilte,
    author: req.body.author
  });
  category.save().then(_category => {
    res.status(200).json({
      message: "Category created successfully"
    });
  }).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });
}
