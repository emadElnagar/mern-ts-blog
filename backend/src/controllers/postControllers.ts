import { RequestHandler, Response } from "express";
import Post from "../models/Post";
import slugify from "slugify";
import { AuthenticatedRequest } from "../types/authTypes";

// Create a new post
export const newPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const foundPostTitle = await Post.findOne({ title: req.body.title });
    if (foundPostTitle) {
      return res
        .status(401)
        .json({ message: "This title already exists, Try another name" });
    }
    interface postType {
      title: string;
      slug: string;
      author: string;
      category: object;
      content: string;
      image: string | undefined;
    }
    const { title, category, content } = req.body;
    // Validations
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!title) {
      return res.status(400).json({ message: "Post title is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!content) {
      return res.status(400).json({ message: "Post content is required" });
    }
    const post = new Post<postType>({
      title: req.body.title,
      slug: slugify(req.body.title, {
        replacement: "-",
        lower: true,
        strict: true,
      }),
      author: req.user?._id,
      category: req.body.category,
      content: req.body.content,
      image: req.file?.filename,
    });
    await post.save();
    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all post
export const GetAllPosts: RequestHandler = async (_req, res) => {
  try {
    const posts = await Post.find()
      .populate("category")
      .sort({ createdAt: -1 });
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get single post
export const GetSinglePost: RequestHandler = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get similar posts
export const GetSimilarPosts: RequestHandler = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const similarPosts = (
      await Post.find({ category: post?.category })
        .sort({ createdAt: -1 })
        .limit(3)
    ).filter((item) => item.slug !== post?.slug);
    if (!similarPosts) return;
    res.status(200).json(similarPosts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
export const UpdatePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const foundPostTitle = await Post.findOne({
      title: req.body.title,
      _id: { $ne: req.params.id },
    });
    if (foundPostTitle) {
      return res
        .status(401)
        .json({ message: "This title already exists, Try another name" });
    }
    const newPost = {
      title: req.body.title,
      slug: slugify(req.body.title, {
        replacement: "-",
        lower: true,
        strict: true,
      }),
      description: req.body.description,
      image: req.file?.filename,
    };
    await Post.updateOne({ _id: req.params.id }, { $set: newPost });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
export const DeletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
