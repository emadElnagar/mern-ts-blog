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

// Create a new 
export const NewPost: any = createAsyncThunk("posts/new", async (post: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/new`, {
      title: post.title,
      author: post.author,
      description: post.description,
      image: post.image,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get all posts
export const GetAllPosts: any = createAsyncThunk("posts/all", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/all`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Get single post
export const GetSinglePost: any = createAsyncThunk("posts/single", async (post: any, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/${post.sulg}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Update post
export const UpdatePost: any = createAsyncThunk("posts/update", async (post: any, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${url}/${post._id}/update`, {
      title: post.title,
      description: post.description,
      image: post.image
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Delete post
export const DeletePost: any = createAsyncThunk("posts/delete", async (id: any, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Add a new post
    .addCase(NewPost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(NewPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    })
    .addCase(NewPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Get all posts
    .addCase(GetAllPosts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(GetAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    })
    .addCase(GetAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Get single post
    .addCase(GetSinglePost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(GetSinglePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    })
    .addCase(GetSinglePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Update post
    .addCase(UpdatePost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(UpdatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        arg: { _id }
      } = action.meta;
      if (_id) {
        state.posts = state.posts.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    })
    .addCase(UpdatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Delete post
    .addCase(DeletePost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(DeletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        arg: { _id }
      } = action.meta;
      if(_id) {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      }
    })
    .addCase(DeletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default postSlice.reducer;
