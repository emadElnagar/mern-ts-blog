import { RequestHandler } from "express";
import Post from "../models/Post";

// Get all post
export const GetAllControllers: RequestHandler = async (req, res) => {
  try {
    const posts = await Post.find();
  } catch (error) {
    res.send(error);
  }
}
