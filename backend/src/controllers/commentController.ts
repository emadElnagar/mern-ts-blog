import { RequestHandler } from "express";
import Comment from "../models/Comment";

export const newComment: RequestHandler = async (req, res) => {
  interface commentType {
    post: string;
    author: object;
    body: string;
  }
  const comment = new Comment<commentType>({
    post: req.params.id,
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
