import { RequestHandler } from "express";
import Post from "../models/Post";
import slugify from "slugify";

// Create a new post
export const newPost: RequestHandler = async (req, res) => {
  const foundPostTitle = await Post.findOne({ title: req.body.title });
  if (foundPostTitle) {
    res.json({ message: 'This title already exists, Try another name' });
  }
  interface postType {
    title: string;
    slug: string;
    author: object,
    category: object,
    content: string;
    image: string;
  }
  const post = new Post<postType>({
    title: req.body.title,
    slug: slugify(req.body.title, {
      replacement: '-',
      lower: true,
      strict: true,
    }),
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
    image: req.body.image
  });
  post.save().then(post => {
    res.status(200).json({
      message: "Post created successfully"
    });
  }).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });
}

// Get all post
export const GetAllPosts: RequestHandler = async (_req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
}

// Get single post
export const GetSinglePost: RequestHandler = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (post) {
    res.send(post);
  } else {
    res.status(404).json({
      message: 'Post Not Found'
    });
  }
}

// Update post
export const UpdatePost: RequestHandler = async (req, res) => {
  const newPost = {
    title: req.body.title,
    slug: slugify(req.body.title, {
      replacement: '-',
      lower: true,
      strict: true,
    }),
    description: req.body.description,
    image: req.body.image
  }
  Post.updateOne({ _id: req.params.id }, { $set: newPost }).then(_result => {
    res.status(200).json({
      message: 'Post updated successfully'
    });
  }).catch(error => {
    res.status(401).json({
      message: "Error" + error.message
    });
  });
}

// Delete post
export const DeletePost: RequestHandler = async (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(_result => {
    res.status(200).json({
      message: "Post deleted successfully"
    });
  }).catch(error => {
    res.status(401).json({
      message: "Error" + error.message
    });
  });
}
