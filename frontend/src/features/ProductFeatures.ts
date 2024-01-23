import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/posts';

export interface Post {
  _id?: object;
  title: string;
  slug: string;
  author: object,
  description: string;
  image: string;
  likes?: object[];
  likesCount?: number;
  comments?: string[];
}

interface PostState {
  posts: Post[],
  post: Post | null,
  isLoading: boolean,
  error: object | null
}

const initialState: PostState = {
  posts: [],
  post: null,
  isLoading: false,
  error: null
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //
  }
});

export default postSlice.reducer;
