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
    body: req.body.body
  })
  comment.save().then(_result => {
    res.status(200).json({
      message: "Comment created successfully"
    });
  }).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });
}

// Get post comments
export const GetPostComments: RequestHandler = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate("author");
    if (! comments) return;
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
