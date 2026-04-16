import { RequestHandler, Response } from "express";
import Comment from "../models/Comment";
import { AuthenticatedRequest } from "../types/authTypes";
import mongoose, { Types } from "mongoose";

// Create a new comment
export const newComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content, post, parentComment } = req.body;
    if (!post || !content) {
      return res.status(400).json({ message: "Post and content are required" });
    }
    const comment = new Comment({
      author: req.user._id,
      post,
      content,
      parentComment,
    });
    await comment.save();
    // Populate the author field before sending the response
    const populatedComment = await comment.populate(
      "author",
      "firstName lastName image",
    );
    res.status(201).json(populatedComment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get post comments (including nested comments)
export const GetPostComments: RequestHandler = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.id,
      parentComment: null,
    })
      .populate("author", "_id firstName lastName image")
      .sort({ createdAt: -1 })
      .lean();
    const commentIds = comments.map((c) => c._id);
    const replies = await Comment.find({
      parentComment: { $in: commentIds },
    })
      .populate("author", "_id firstName lastName image")
      .lean();
    const commentsWithReplies = comments.map((comment) => ({
      ...comment,
      replies: replies.filter(
        (reply) => reply.parentComment?.toString() === comment._id.toString(),
      ),
    }));
    res.status(200).json(commentsWithReplies);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

// Update comment
export const UpdateComment = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const user = req.user;
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment?.author.toString() !== user?._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can update only your comment" });
    }
    const newComment = {
      content: req.body.content,
    };
    await Comment.updateOne({ _id: req.params.id }, { $set: newComment });
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Like comment
export const LikeComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const commentId = req.params.id;
    const user = req.user;
    const userIdRaw = typeof user === "string" ? user : (user as any)?._id;

    if (!userIdRaw || !mongoose.Types.ObjectId.isValid(userIdRaw)) {
      return res.status(400).json({
        message: "Invalid user id format",
      });
    }

    const userId = new mongoose.Types.ObjectId(userIdRaw);

    const alreadyLiked = await Comment.exists({
      _id: commentId,
      likes: userId,
    });
    const update = alreadyLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };
    const result = await Comment.updateOne({ _id: commentId }, update);

    // Not found check
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      message: alreadyLiked ? "Like removed" : "Comment liked",
      liked: !alreadyLiked,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Recursive function to delete a comment and its replies
async function deleteCommentAndReplies(commentId: string) {
  const replies = await Comment.find({ parentComment: commentId });

  for (const reply of replies) {
    await deleteCommentAndReplies(reply._id.toString());
  }

  await Comment.findByIdAndDelete(commentId);
}

// Delete comment
export const DeleteComment = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
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
    await deleteCommentAndReplies(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
