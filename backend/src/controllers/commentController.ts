import { RequestHandler } from "express";
import Comment from "../models/Comment";

// Create a new comment
export const newComment: RequestHandler = async (req, res) => {
  interface commentType {
    post: string;
    author: object;
    body: string;
  }
  const comment = new Comment<commentType>({
    post: req.body.post,
    author: req.body.author,
    body: req.body.body,
  });
  comment
    .save()
    .then((_result) => {
      res.status(200).json({
        message: "Comment created successfully",
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: err.message,
      });
    });
};

// Get post comments
export const GetPostComments: RequestHandler = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .sort({ createdAt: -1 })
      .populate("author");
    if (!comments) return;
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

// Update comment
export const UpdateComment: RequestHandler = async (req, res) => {
  const newComment = {
    body: req.body.body,
  };
  Comment.updateOne({ _id: req.params.id }, { $set: newComment })
    .then((_result) => {
      res.status(200).json({
        message: "Post updated successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Error" + error.message,
      });
    });
};

// Delete comment
export const DeleteComment: RequestHandler = async (req, res) => {
  Comment.deleteOne({ _id: req.params.id })
    .then((_result) => {
      res.status(200).json({
        message: "comment deleted successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Error" + error.message,
      });
    });
};
