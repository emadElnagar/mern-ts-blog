import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_POST_URL } from "../Api";

const url = API_POST_URL;

export interface Post {
  _id?: object;
  title: string;
  slug: string;
  author: object;
  description: string;
  image: string;
  likes?: object[];
}

interface PostState {
  posts: Post[];
  post: Post | null;
  similarPosts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  post: null,
  similarPosts: [],
  isLoading: false,
  error: null,
};

// Create a new
export const NewPost: any = createAsyncThunk(
  "posts/new",
  async (data: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${url}`, data, config);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

// Get all posts
export const GetAllPosts = createAsyncThunk<Post[]>(
  "posts/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

// Get single post
export const GetSinglePost = createAsyncThunk<
  Post,
  string,
  { rejectValue: string }
>("posts/single", async (slug: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/${slug}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get similar posts
export const GetSimilarPosts = createAsyncThunk<
  Post[],
  string,
  { rejectValue: string }
>("posts/similar", async (slug: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/${slug}/similar`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Update post
export const UpdatePost: any = createAsyncThunk(
  "posts/update",
  async (data: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${url}/${data._id}`, data, config);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

// Delete post
export const DeletePost: any = createAsyncThunk(
  "posts/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${url}/${id}`, config);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add a new post
      .addCase(NewPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(NewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(NewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get all posts
      .addCase(GetAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(GetAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get single post
      .addCase(GetSinglePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.post = action.payload;
      })
      .addCase(GetSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get similar posts
      .addCase(GetSimilarPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSimilarPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.similarPosts = action.payload;
      })
      .addCase(GetSimilarPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update post
      .addCase(UpdatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.posts = state.posts.map((item) =>
            item._id === _id ? action.payload : item,
          );
        }
      })
      .addCase(UpdatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete post
      .addCase(DeletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.posts = state.posts.filter(
            (post) => post._id !== action.payload,
          );
        }
      })
      .addCase(DeletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
