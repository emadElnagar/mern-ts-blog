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
    description: string;
    image: string;
    likesCount: number;
  }
  const post = new Post<postType>({
    title: req.body.title,
    slug: slugify(req.body.title, {
      replacement: '-',
      lower: true,
      strict: true,
    }),
    description: req.body.description,
    image: req.body.image,
    likesCount: 0
  });
  post.save().then(post => {
    res.status(200).json({
      _id: post._id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      image: post.image,
      likesCount: post.likesCount
    })
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
