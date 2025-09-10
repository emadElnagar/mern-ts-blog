import { RequestHandler, Response } from "express";
import Comment from "../models/Comment";
import { AuthenticatedRequest } from "../types/authTypes";

// Create a new comment
export const newComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    interface commentType {
      post: string;
      author: string;
      body: string;
    }
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.body.post || !req.body.body) {
      return res.status(400).json({ message: "Post and body are required" });
    }
    const comment = new Comment<commentType>({
      post: req.body.post,
      author: req.user._id,
      body: req.body.body,
    });
    await comment.save();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
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
export const UpdateComment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const user = req.user;
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (comment?.author.toString() !== user?._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can update only your comment" });
    }
    const newComment = {
      body: req.body.body,
    };
    await Comment.updateOne({ _id: req.params.id }, { $set: newComment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
export const DeleteComment = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const user = req.user;
    if (
      user?.role !== "admin" &&
      comment?.author.toString() !== user?._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can delete only your comment" });
    }
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Add comment reply
export const AddReply = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newReply = {
      author: req.user._id,
      body: req.body.body,
    };
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.body.body) {
      return res.status(400).json({ message: "Reply body is required" });
    }
    await Comment.updateOne(
      { _id: req.params.id },
      { $push: { replies: newReply } }
    );
    res.status(200).json({ message: "Reply added successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
